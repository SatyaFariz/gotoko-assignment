import { MigrationInterface, QueryRunner } from "typeorm";

export class ReceiptIdCol1673288504791 implements MigrationInterface {
    name = 'ReceiptIdCol1673288504791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`totalPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`totalReturn\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`receiptId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`receiptId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`totalReturn\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`totalPrice\``);
    }

}
