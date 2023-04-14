import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681323063108 implements MigrationInterface {
    name = 'default1681323063108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" DROP DEFAULT`);
    }

}
