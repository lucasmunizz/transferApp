import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681345081975 implements MigrationInterface {
    name = 'default1681345081975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_bf06b2bb716b23227f4fe178feb"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0709f08a810a1865bba92aca11b"`);
        await queryRunner.query(`CREATE TABLE "accounts_transactions_transactions" ("accountsId" integer NOT NULL, "transactionsId" integer NOT NULL, CONSTRAINT "PK_c5b2f6522113427b2e948cceceb" PRIMARY KEY ("accountsId", "transactionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32f927151061589429c32f17a3" ON "accounts_transactions_transactions" ("accountsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29195d0f94eeb43b823edd3550" ON "accounts_transactions_transactions" ("transactionsId") `);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "senderAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "receiverAccountId"`);
        await queryRunner.query(`ALTER TABLE "accounts_transactions_transactions" ADD CONSTRAINT "FK_32f927151061589429c32f17a31" FOREIGN KEY ("accountsId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accounts_transactions_transactions" ADD CONSTRAINT "FK_29195d0f94eeb43b823edd35500" FOREIGN KEY ("transactionsId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts_transactions_transactions" DROP CONSTRAINT "FK_29195d0f94eeb43b823edd35500"`);
        await queryRunner.query(`ALTER TABLE "accounts_transactions_transactions" DROP CONSTRAINT "FK_32f927151061589429c32f17a31"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "receiverAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "senderAccountId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29195d0f94eeb43b823edd3550"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32f927151061589429c32f17a3"`);
        await queryRunner.query(`DROP TABLE "accounts_transactions_transactions"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0709f08a810a1865bba92aca11b" FOREIGN KEY ("receiverAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_bf06b2bb716b23227f4fe178feb" FOREIGN KEY ("senderAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
