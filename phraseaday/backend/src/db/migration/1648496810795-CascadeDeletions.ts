import { MigrationInterface, QueryRunner } from 'typeorm'

export class CascadeDeletions1648496810795 implements MigrationInterface {
    name = 'CascadeDeletions1648496810795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "review" DROP CONSTRAINT "FK_81e27be0b9bbfc519703365c729"')
        await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d"')
        await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd"')
        await queryRunner.query('ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_807a3843a1c2dd2e10063878631"')
        await queryRunner.query('ALTER TABLE "review" ADD CONSTRAINT "FK_81e27be0b9bbfc519703365c729" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd" FOREIGN KEY ("worksheetEntryId") REFERENCES "worksheet_entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_807a3843a1c2dd2e10063878631" FOREIGN KEY ("userId_2", "userUsername_2") REFERENCES "user"("id","username") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_807a3843a1c2dd2e10063878631"')
        await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd"')
        await queryRunner.query('ALTER TABLE "review_entry" DROP CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d"')
        await queryRunner.query('ALTER TABLE "review" DROP CONSTRAINT "FK_81e27be0b9bbfc519703365c729"')
        await queryRunner.query('ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_807a3843a1c2dd2e10063878631" FOREIGN KEY ("userId_2", "userUsername_2") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_b697b324ef975fddcfbfb4f2fbd" FOREIGN KEY ("worksheetEntryId") REFERENCES "worksheet_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review_entry" ADD CONSTRAINT "FK_66aa2fb3b46acf5d64b00358d7d" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "review" ADD CONSTRAINT "FK_81e27be0b9bbfc519703365c729" FOREIGN KEY ("worksheetId") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }
}
