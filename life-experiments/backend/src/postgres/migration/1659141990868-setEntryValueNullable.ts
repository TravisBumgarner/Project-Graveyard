import {MigrationInterface, QueryRunner} from "typeorm";

export class setEntryValueNullable1659141990868 implements MigrationInterface {
    name = 'setEntryValueNullable1659141990868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "value" SET NOT NULL`);
    }

}
