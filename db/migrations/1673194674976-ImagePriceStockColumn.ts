import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagePriceStockColumn1673194674976 implements MigrationInterface {
    name = 'ImagePriceStockColumn1673194674976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`stock\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`stock\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
    }

}
