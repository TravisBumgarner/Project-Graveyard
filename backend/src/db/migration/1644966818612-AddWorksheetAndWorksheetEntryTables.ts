import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWorksheetAndWorksheetEntryTables1644966818612 implements MigrationInterface {
    name = 'AddWorksheetAndWorksheetEntryTables1644966818612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "text" varchar NOT NULL, "worksheetId" varchar)`);
        await queryRunner.query(`CREATE TABLE "worksheet" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "date" date NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "text" varchar NOT NULL, "worksheetId" varchar, CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_worksheet_entry"("id", "text", "worksheetId") SELECT "id", "text", "worksheetId" FROM "worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "worksheet_entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_worksheet_entry" RENAME TO "worksheet_entry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_entry" RENAME TO "temporary_worksheet_entry"`);
        await queryRunner.query(`CREATE TABLE "worksheet_entry" ("id" varchar PRIMARY KEY NOT NULL, "text" varchar NOT NULL, "worksheetId" varchar)`);
        await queryRunner.query(`INSERT INTO "worksheet_entry"("id", "text", "worksheetId") SELECT "id", "text", "worksheetId" FROM "temporary_worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_worksheet_entry"`);
        await queryRunner.query(`DROP TABLE "worksheet"`);
        await queryRunner.query(`DROP TABLE "worksheet_entry"`);
    }

}
