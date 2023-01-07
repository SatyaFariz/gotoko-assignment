import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1673085164318 implements MigrationInterface {
    name = 'NewMigrations1673085164318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone_number\` varchar(255) NOT NULL`);
    }

}
