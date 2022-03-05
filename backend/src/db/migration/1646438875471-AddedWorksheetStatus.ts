import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedWorksheetStatus1646438875471 implements MigrationInterface {
    name = 'AddedWorksheetStatus1646438875471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."worksheet_status_enum" AS ENUM('new', 'needs_review', 'has_reviews')`);
        await queryRunner.query(`ALTER TABLE "worksheet" ADD "status" "public"."worksheet_status_enum" NOT NULL DEFAULT 'new'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_status_enum"`);
    }

}
