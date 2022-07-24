import {MigrationInterface, QueryRunner} from "typeorm";

export class addMetricTable1658701401541 implements MigrationInterface {
    name = 'addMetricTable1658701401541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metric" ("id" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_7d24c075ea2926dd32bd1c534ce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "metric"`);
    }

}
