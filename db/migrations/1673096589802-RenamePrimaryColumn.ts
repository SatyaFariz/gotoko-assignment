import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePrimaryColumn1673096589802 implements MigrationInterface {
    name = 'RenamePrimaryColumn1673096589802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`id\` \`categoryId\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`categoryId\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
