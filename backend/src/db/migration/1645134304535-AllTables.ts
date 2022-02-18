import {MigrationInterface, QueryRunner} from "typeorm";

export class AllTables1645134304535 implements MigrationInterface {
    name = 'AllTables1645134304535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "knownLanguageText" varchar NOT NULL, "newLanguageText" varchar NOT NULL, "worksheetId" varchar NOT NULL, "audioUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar NOT NULL, "userName" varchar NOT NULL, "firebaseId" varchar NOT NULL, PRIMARY KEY ("id", "userName"))`);
        await queryRunner.query(`CREATE TABLE "worksheet" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "knownLanguage" varchar NOT NULL, "newLanguage" varchar NOT NULL, "userId" varchar NOT NULL, "date" date NOT NULL, "userUserName" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "knownLanguageText" varchar NOT NULL, "newLanguageText" varchar NOT NULL, "worksheetId" varchar NOT NULL, "audioUrl" varchar NOT NULL, CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_worksheet_entry"("id", "knownLanguageText", "newLanguageText", "worksheetId", "audioUrl") SELECT "id", "knownLanguageText", "newLanguageText", "worksheetId", "audioUrl" FROM "worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "worksheet_entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_worksheet_entry" RENAME TO "worksheet_entry"`);
        await queryRunner.query(`CREATE TABLE "temporary_worksheet" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "knownLanguage" varchar NOT NULL, "newLanguage" varchar NOT NULL, "userId" varchar NOT NULL, "date" date NOT NULL, "userUserName" varchar, CONSTRAINT "FK_f6effabbfeae7208bc984861f0f" FOREIGN KEY ("userId", "userUserName") REFERENCES "user" ("id", "userName") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_worksheet"("id", "title", "description", "knownLanguage", "newLanguage", "userId", "date", "userUserName") SELECT "id", "title", "description", "knownLanguage", "newLanguage", "userId", "date", "userUserName" FROM "worksheet"`);
        await queryRunner.query(`DROP TABLE "worksheet"`);
        await queryRunner.query(`ALTER TABLE "temporary_worksheet" RENAME TO "worksheet"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet" RENAME TO "temporary_worksheet"`);
        await queryRunner.query(`CREATE TABLE "worksheet" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "knownLanguage" varchar NOT NULL, "newLanguage" varchar NOT NULL, "userId" varchar NOT NULL, "date" date NOT NULL, "userUserName" varchar)`);
        await queryRunner.query(`INSERT INTO "worksheet"("id", "title", "description", "knownLanguage", "newLanguage", "userId", "date", "userUserName") SELECT "id", "title", "description", "knownLanguage", "newLanguage", "userId", "date", "userUserName" FROM "temporary_worksheet"`);
        await queryRunner.query(`DROP TABLE "temporary_worksheet"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entry" RENAME TO "temporary_worksheet_entry"`);
        await queryRunner.query(`CREATE TABLE "worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "knownLanguageText" varchar NOT NULL, "newLanguageText" varchar NOT NULL, "worksheetId" varchar NOT NULL, "audioUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "worksheet_entry"("id", "knownLanguageText", "newLanguageText", "worksheetId", "audioUrl") SELECT "id", "knownLanguageText", "newLanguageText", "worksheetId", "audioUrl" FROM "temporary_worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "worksheet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "worksheet_entry"`);
    }

}
