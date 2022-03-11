import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFriendsRelation1646957741914 implements MigrationInterface {
    name = 'AddFriendsRelation1646957741914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "user_followers_user" ("userId_1" character varying NOT NULL, "userUsername_1" character varying NOT NULL, "userId_2" character varying NOT NULL, "userUsername_2" character varying NOT NULL, CONSTRAINT "PK_29a7aad0a1cfb2936cbca8c229c" PRIMARY KEY ("userId_1", "userUsername_1", "userId_2", "userUsername_2"))')
        await queryRunner.query('CREATE INDEX "IDX_891505e68ef90c800a557a68fa" ON "user_followers_user" ("userId_1", "userUsername_1") ')
        await queryRunner.query('CREATE INDEX "IDX_807a3843a1c2dd2e1006387863" ON "user_followers_user" ("userId_2", "userUsername_2") ')
        await queryRunner.query('ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_891505e68ef90c800a557a68fa3" FOREIGN KEY ("userId_1", "userUsername_1") REFERENCES "user"("id","username") ON DELETE CASCADE ON UPDATE CASCADE')
        await queryRunner.query('ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_807a3843a1c2dd2e10063878631" FOREIGN KEY ("userId_2", "userUsername_2") REFERENCES "user"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_807a3843a1c2dd2e10063878631"')
        await queryRunner.query('ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_891505e68ef90c800a557a68fa3"')
        await queryRunner.query('DROP INDEX "public"."IDX_807a3843a1c2dd2e1006387863"')
        await queryRunner.query('DROP INDEX "public"."IDX_891505e68ef90c800a557a68fa"')
        await queryRunner.query('DROP TABLE "user_followers_user"')
    }
}
