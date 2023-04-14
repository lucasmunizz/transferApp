import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681404262278 implements MigrationInterface {
    name = 'default1681404262278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" RENAME COLUMN "email" TO "username"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD CONSTRAINT "UQ_4ba6d0c734d53f8e1b2e24b6c56" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" DROP CONSTRAINT "UQ_4ba6d0c734d53f8e1b2e24b6c56"`);
        await queryRunner.query(`ALTER TABLE "admins" RENAME COLUMN "username" TO "email"`);
    }

}
