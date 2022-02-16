import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAudioColumn1644980377279 implements MigrationInterface {
    name = 'AddAudioColumn1644980377279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "knownLanguageText" varchar NOT NULL, "newLanguageText" varchar NOT NULL, "worksheetId" varchar NOT NULL, "audioUrl" varchar NOT NULL, CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_worksheet_entry"("id", "knownLanguageText", "newLanguageText", "worksheetId") SELECT "id", "knownLanguageText", "newLanguageText", "worksheetId" FROM "worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "worksheet_entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_worksheet_entry" RENAME TO "worksheet_entry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_entry" RENAME TO "temporary_worksheet_entry"`);
        await queryRunner.query(`CREATE TABLE "worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "knownLanguageText" varchar NOT NULL, "newLanguageText" varchar NOT NULL, "worksheetId" varchar NOT NULL, CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "worksheet_entry"("id", "knownLanguageText", "newLanguageText", "worksheetId") SELECT "id", "knownLanguageText", "newLanguageText", "worksheetId" FROM "temporary_worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_worksheet_entry"`);
    }

}
