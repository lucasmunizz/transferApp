import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681345921777 implements MigrationInterface {
    name = 'default1681345921777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "senderAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "receiverAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_bf06b2bb716b23227f4fe178feb" FOREIGN KEY ("senderAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0709f08a810a1865bba92aca11b" FOREIGN KEY ("receiverAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0709f08a810a1865bba92aca11b"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_bf06b2bb716b23227f4fe178feb"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "receiverAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "senderAccountId"`);
    }

}
