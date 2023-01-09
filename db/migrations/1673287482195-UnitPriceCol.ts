import { MigrationInterface, QueryRunner } from "typeorm";

export class UnitPriceCol1673287482195 implements MigrationInterface {
    name = 'UnitPriceCol1673287482195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`unitPrice\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`unitPrice\``);
    }

}
