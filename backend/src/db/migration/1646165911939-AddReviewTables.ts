import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReviewTables1646165911939 implements MigrationInterface {
    name = 'AddReviewTables1646165911939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "date" date NOT NULL, "userUsername" character varying, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review_entry" ("id" character varying NOT NULL, "reviewId" character varying NOT NULL, "worksheetEntryId" character varying NOT NULL, "writtenFeedback" character varying NOT NULL, "oralFeedback" character varying NOT NULL, CONSTRAINT "PK_51cece6e2b1dea5cc431b0b813d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_61da3e1e50a8205159b01dfdd50" FOREIGN KEY ("userId", "userUsername") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_entry" ADD CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_entry" ADD CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd" FOREIGN KEY ("worksheetEntryId") REFERENCES "worksheet_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review_entry" DROP CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd"`);
        await queryRunner.query(`ALTER TABLE "review_entry" DROP CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_61da3e1e50a8205159b01dfdd50"`);
        await queryRunner.query(`DROP TABLE "review_entry"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
