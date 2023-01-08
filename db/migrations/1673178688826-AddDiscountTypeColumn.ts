import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDiscountTypeColumn1673178688826 implements MigrationInterface {
    name = 'AddDiscountTypeColumn1673178688826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`type\` enum ('BUY_N', 'PERCENT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`type\``);
    }

}
