import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryRemoveTest1673198437063 implements MigrationInterface {
    name = 'CategoryRemoveTest1673198437063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`test\` varchar(255) NOT NULL`);
    }

}
