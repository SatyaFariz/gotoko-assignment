import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDiscountColumns1673178394278 implements MigrationInterface {
    name = 'UpdateDiscountColumns1673178394278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8b4d0e2be5e945a828f313b4f3\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`result\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`expiredAt\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`expiredAt\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`result\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8b4d0e2be5e945a828f313b4f3\` ON \`product\` (\`categoryCategoryId\`)`);
    }

}
