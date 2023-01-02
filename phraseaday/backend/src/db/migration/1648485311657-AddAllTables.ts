import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAllTables1648485311657 implements MigrationInterface {
    name = 'AddAllTables1648485311657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "firebaseId" character varying NOT NULL, CONSTRAINT "PK_72da1f98d8d8a4f2fb77754e2e0" PRIMARY KEY ("id", "username"))')
        await queryRunner.query('CREATE TYPE "public"."review_status_enum" AS ENUM(\'review_requested\', \'review_in_progress\', \'review_completed\')')
        await queryRunner.query('CREATE TABLE "review" ("id" character varying NOT NULL, "reviewerId" character varying NOT NULL, "worksheetId" character varying NOT NULL, "date" date NOT NULL, "status" "public"."review_status_enum" NOT NULL DEFAULT \'review_requested\', "reviewerUsername" character varying, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "review_entry" ("id" character varying NOT NULL, "reviewId" character varying NOT NULL, "worksheetEntryId" character varying NOT NULL, "writtenFeedback" character varying NOT NULL, "oralFeedback" character varying NOT NULL, CONSTRAINT "PK_51cece6e2b1dea5cc431b0b813d" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "worksheet_entry" ("id" character varying NOT NULL, "knownLanguageText" character varying NOT NULL, "newLanguageText" character varying NOT NULL, "worksheetId" character varying NOT NULL, "audioUrl" character varying NOT NULL, CONSTRAINT "PK_4da3c575ec968af8097f7ec9823" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TYPE "public"."worksheet_status_enum" AS ENUM(\'new\', \'needs_review\', \'has_reviews\')')
        await queryRunner.query('CREATE TABLE "worksheet" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "knownLanguage" character varying NOT NULL, "newLanguage" character varying NOT NULL, "userId" character varying NOT NULL, "date" date NOT NULL, "status" "public"."worksheet_status_enum" NOT NULL DEFAULT \'new\', "userUsername" character varying, CONSTRAINT "PK_4288372d711457f58abb7dd90c5" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "user_followers_user" ("userId_1" character varying NOT NULL, "userUsername_1" character varying NOT NULL, "userId_2" character varying NOT NULL, "userUsername_2" character varying NOT NULL, CONSTRAINT "PK_29a7aad0a1cfb2936cbca8c229c" PRIMARY KEY ("userId_1", "userUsername_1", "userId_2", "userUsername_2"))')
        await queryRunner.query('CREATE INDEX "IDX_891505e68ef90c800a557a68fa" ON "user_followers_user" ("userId_1", "userUsername_1") ')
        await queryRunner.query('CREATE INDEX "IDX_807a3843a1c2dd2e1006387863" ON "user_followers_user" ("userId_2", "userUsername_2") ')
        await queryRunner.query('ALTER TABLE "review" ADD CONSTRAINT "FK_81e27be0b9bbfc519703365c729" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review" ADD CONSTRAINT "FK_ca7b8429e8f5d608dbaf125581d" FOREIGN KEY ("reviewerId", "reviewerUsername") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd" FOREIGN KEY ("worksheetEntryId") REFERENCES "worksheet_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "worksheet_entry" ADD CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "worksheet" ADD CONSTRAINT "FK_7ed544b82f7f5b6b5649ff6ad17" FOREIGN KEY ("userId", "userUsername") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_891505e68ef90c800a557a68fa3" FOREIGN KEY ("userId_1", "userUsername_1") REFERENCES "user"("id","username") ON DELETE CASCADE ON UPDATE CASCADE')
        await queryRunner.query('ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_807a3843a1c2dd2e10063878631" FOREIGN KEY ("userId_2", "userUsername_2") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_807a3843a1c2dd2e10063878631"')
        await queryRunner.query('ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_891505e68ef90c800a557a68fa3"')
        await queryRunner.query('ALTER TABLE "worksheet" DROP CONSTRAINT "FK_7ed544b82f7f5b6b5649ff6ad17"')
        await queryRunner.query('ALTER TABLE "worksheet_entry" DROP CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465"')
        await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd"')
        await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d"')
        await queryRunner.query('ALTER TABLE "review" DROP CONSTRAINT "FK_ca7b8429e8f5d608dbaf125581d"')
        await queryRunner.query('ALTER TABLE "review" DROP CONSTRAINT "FK_81e27be0b9bbfc519703365c729"')
        await queryRunner.query('DROP INDEX "public"."IDX_807a3843a1c2dd2e1006387863"')
        await queryRunner.query('DROP INDEX "public"."IDX_891505e68ef90c800a557a68fa"')
        await queryRunner.query('DROP TABLE "user_followers_user"')
        await queryRunner.query('DROP TABLE "worksheet"')
        await queryRunner.query('DROP TYPE "public"."worksheet_status_enum"')
        await queryRunner.query('DROP TABLE "worksheet_entry"')
        await queryRunner.query('DROP TABLE "review_entry"')
        await queryRunner.query('DROP TABLE "review"')
        await queryRunner.query('DROP TYPE "public"."review_status_enum"')
        await queryRunner.query('DROP TABLE "user"')
    }
}
