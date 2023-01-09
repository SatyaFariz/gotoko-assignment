import { MigrationInterface, QueryRunner } from "typeorm";

export class FinalPriceCol1673286816161 implements MigrationInterface {
    name = 'FinalPriceCol1673286816161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`totalNormalPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`totalFinalPrice\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`totalFinalPrice\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`totalNormalPrice\``);
    }

}
