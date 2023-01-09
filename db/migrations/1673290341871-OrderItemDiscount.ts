import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderItemDiscount1673290341871 implements MigrationInterface {
    name = 'OrderItemDiscount1673290341871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`discountDiscountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_2b190f3c372c5100451c767a707\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderOrderId\` \`orderOrderId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_2b190f3c372c5100451c767a707\` FOREIGN KEY (\`orderOrderId\`) REFERENCES \`order\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_4a0ad65dea40db2531485ee9488\` FOREIGN KEY (\`discountDiscountId\`) REFERENCES \`discount\`(\`discountId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_4a0ad65dea40db2531485ee9488\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_2b190f3c372c5100451c767a707\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderOrderId\` \`orderOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_2b190f3c372c5100451c767a707\` FOREIGN KEY (\`orderOrderId\`) REFERENCES \`order\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`discountDiscountId\``);
    }

}
