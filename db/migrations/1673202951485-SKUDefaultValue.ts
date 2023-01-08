import { MigrationInterface, QueryRunner } from "typeorm";

export class SKUDefaultValue1673202951485 implements MigrationInterface {
    name = 'SKUDefaultValue1673202951485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`sku\` varchar(255) NOT NULL DEFAULT 'LAST_INSERT_ID()'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sku\``);
    }

}
