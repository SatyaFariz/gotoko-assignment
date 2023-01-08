import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscountTable1673176867905 implements MigrationInterface {
    name = 'DiscountTable1673176867905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`id\` \`productId\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE TABLE \`discount\` (\`discountId\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, PRIMARY KEY (\`discountId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`discount\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`productId\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
