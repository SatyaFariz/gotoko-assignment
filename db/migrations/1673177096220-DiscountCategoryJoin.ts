import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscountCategoryJoin1673177096220 implements MigrationInterface {
    name = 'DiscountCategoryJoin1673177096220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`discountDiscountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\` (\`discountDiscountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_71d8bbc56a43618ed5e26e67b4\` ON \`product\` (\`discountDiscountId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_71d8bbc56a43618ed5e26e67b4f\` FOREIGN KEY (\`discountDiscountId\`) REFERENCES \`discount\`(\`discountId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_71d8bbc56a43618ed5e26e67b4f\``);
        await queryRunner.query(`DROP INDEX \`REL_71d8bbc56a43618ed5e26e67b4\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`discountDiscountId\``);
    }

}
