import { MigrationInterface, QueryRunner } from "typeorm";

export class SKUCol1673202060069 implements MigrationInterface {
    name = 'SKUCol1673202060069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`sku\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sku\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\` ON \`product\` (\`discountDiscountId\`)`);
    }

}
