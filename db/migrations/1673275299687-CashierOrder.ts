import { MigrationInterface, QueryRunner } from "typeorm";

export class CashierOrder1673275299687 implements MigrationInterface {
    name = 'CashierOrder1673275299687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`cashierCashierId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_ca6bbc9a70142b209a499f8b69b\` FOREIGN KEY (\`cashierCashierId\`) REFERENCES \`cashier\`(\`cashierId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_ca6bbc9a70142b209a499f8b69b\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`cashierCashierId\``);
    }

}
