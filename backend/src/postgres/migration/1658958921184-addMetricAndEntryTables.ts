import {MigrationInterface, QueryRunner} from "typeorm";

export class addMetricAndEntryTables1658958921184 implements MigrationInterface {
    name = 'addMetricAndEntryTables1658958921184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metric" ("id" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_7d24c075ea2926dd32bd1c534ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" character varying NOT NULL, "value" double precision NOT NULL, "date" date NOT NULL, "metricId" character varying, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_3f0262066d665178f01c25d18b0" FOREIGN KEY ("metricId") REFERENCES "metric"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_3f0262066d665178f01c25d18b0"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`DROP TABLE "metric"`);
    }

}
