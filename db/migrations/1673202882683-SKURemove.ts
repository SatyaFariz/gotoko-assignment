import { MigrationInterface, QueryRunner } from "typeorm";

export class SKURemove1673202882683 implements MigrationInterface {
    name = 'SKURemove1673202882683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sku\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`sku\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\` (\`sku\`)`);
    }

}
