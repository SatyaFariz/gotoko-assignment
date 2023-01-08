import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategoryJoin1673177820689 implements MigrationInterface {
    name = 'ProductCategoryJoin1673177820689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`categoryCategoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_8b4d0e2be5e945a828f313b4f3\` (\`categoryCategoryId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8b4d0e2be5e945a828f313b4f3\` ON \`product\` (\`categoryCategoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_8b4d0e2be5e945a828f313b4f30\` FOREIGN KEY (\`categoryCategoryId\`) REFERENCES \`category\`(\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_8b4d0e2be5e945a828f313b4f30\``);
        await queryRunner.query(`DROP INDEX \`REL_8b4d0e2be5e945a828f313b4f3\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_8b4d0e2be5e945a828f313b4f3\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`categoryCategoryId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\` ON \`product\` (\`discountDiscountId\`)`);
    }

}
