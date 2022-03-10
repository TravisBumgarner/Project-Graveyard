import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascadeDeleteWorksheet1646790047610 implements MigrationInterface {
    name = 'AddCascadeDeleteWorksheet1646790047610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_entry" DROP CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entry" ADD CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_entry" DROP CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entry" ADD CONSTRAINT "FK_c2bc7b71a14477c8a6a92f39465" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
