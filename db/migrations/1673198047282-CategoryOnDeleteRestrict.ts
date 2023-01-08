import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryOnDeleteRestrict1673198047282 implements MigrationInterface {
    name = 'CategoryOnDeleteRestrict1673198047282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`test\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`test\``);
    }

}
