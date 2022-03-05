import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllTables1646433919367 implements MigrationInterface {
  name = 'AllTables1646433919367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "firebaseId" character varying NOT NULL, CONSTRAINT "PK_72da1f98d8d8a4f2fb77754e2e0" PRIMARY KEY ("id", "username"))');
    await queryRunner.query('CREATE TABLE "review" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "worksheetId" character varying NOT NULL, "date" date NOT NULL, "userUsername" character varying, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "review_entry" ("id" character varying NOT NULL, "reviewId" character varying NOT NULL, "worksheetEntryId" character varying NOT NULL, "writtenFeedback" character varying NOT NULL, "oralFeedback" character varying NOT NULL, CONSTRAINT "PK_51cece6e2b1dea5cc431b0b813d" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "worksheet_entry" ("id" character varying NOT NULL, "knownLanguageText" character varying NOT NULL, "newLanguageText" character varying NOT NULL, "worksheetId" character varying NOT NULL, "audioUrl" character varying NOT NULL, CONSTRAINT "PK_4da3c575ec968af8097f7ec9823" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "worksheet" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "knownLanguage" character varying NOT NULL, "newLanguage" character varying NOT NULL, "userId" character varying NOT NULL, "date" date NOT NULL, "userUsername" character varying, CONSTRAINT "PK_4288372d711457f58abb7dd90c5" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "review" ADD CONSTRAINT "FK_81e27be0b9bbfc519703365c729" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "review" ADD CONSTRAINT "FK_61da3e1e50a8205159b01dfdd50" FOREIGN KEY ("userId", "userUsername") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd" FOREIGN KEY ("worksheetEntryId") REFERENCES "worksheet_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "worksheet_entry" ADD CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "worksheet" ADD CONSTRAINT "FK_7ed544b82f7f5b6b5649ff6ad17" FOREIGN KEY ("userId", "userUsername") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "worksheet" DROP CONSTRAINT "FK_7ed544b82f7f5b6b5649ff6ad17"');
    await queryRunner.query('ALTER TABLE "worksheet_entry" DROP CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465"');
    await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd"');
    await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d"');
    await queryRunner.query('ALTER TABLE "review" DROP CONSTRAINT "FK_61da3e1e50a8205159b01dfdd50"');
    await queryRunner.query('ALTER TABLE "review" DROP CONSTRAINT "FK_81e27be0b9bbfc519703365c729"');
    await queryRunner.query('DROP TABLE "worksheet"');
    await queryRunner.query('DROP TABLE "worksheet_entry"');
    await queryRunner.query('DROP TABLE "review_entry"');
    await queryRunner.query('DROP TABLE "review"');
    await queryRunner.query('DROP TABLE "user"');
  }
}
