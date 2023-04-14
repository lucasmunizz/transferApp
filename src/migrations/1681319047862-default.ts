import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681319047862 implements MigrationInterface {
    name = 'default1681319047862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "holders" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, CONSTRAINT "UQ_3d8e6a0f26437156fe8ea7e0a3c" UNIQUE ("email"), CONSTRAINT "UQ_123376f73d9101f480729341e07" UNIQUE ("cpf"), CONSTRAINT "PK_db78e78aa79aa06fd917151e37f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "amount" character varying NOT NULL, "senderAccountId" integer, "receiverAccountId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "numberAccount" character varying NOT NULL, "balance" integer NOT NULL, "holderId" integer, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_bf06b2bb716b23227f4fe178feb" FOREIGN KEY ("senderAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0709f08a810a1865bba92aca11b" FOREIGN KEY ("receiverAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_2d09af8892e126f44f429770a30" FOREIGN KEY ("holderId") REFERENCES "holders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_2d09af8892e126f44f429770a30"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0709f08a810a1865bba92aca11b"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_bf06b2bb716b23227f4fe178feb"`);
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "holders"`);
    }

}
