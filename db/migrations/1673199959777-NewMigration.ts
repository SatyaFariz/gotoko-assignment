import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1673199959777 implements MigrationInterface {
    name = 'NewMigration1673199959777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`categoryId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`productId\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`stock\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`discountDiscountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\` (\`discountDiscountId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`categoryCategoryId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_71d8bbc56a43618ed5e26e67b4\` ON \`product\` (\`discountDiscountId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_71d8bbc56a43618ed5e26e67b4f\` FOREIGN KEY (\`discountDiscountId\`) REFERENCES \`discount\`(\`discountId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_8b4d0e2be5e945a828f313b4f30\` FOREIGN KEY (\`categoryCategoryId\`) REFERENCES \`category\`(\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_8b4d0e2be5e945a828f313b4f30\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_71d8bbc56a43618ed5e26e67b4f\``);
        await queryRunner.query(`DROP INDEX \`REL_71d8bbc56a43618ed5e26e67b4\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`categoryCategoryId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_71d8bbc56a43618ed5e26e67b4\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`discountDiscountId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`stock\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
