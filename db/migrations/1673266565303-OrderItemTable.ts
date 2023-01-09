import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderItemTable1673266565303 implements MigrationInterface {
    name = 'OrderItemTable1673266565303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`orderItemId\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderOrderId\` int NULL, \`productProductId\` int NULL, PRIMARY KEY (\`orderItemId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_2b190f3c372c5100451c767a707\` FOREIGN KEY (\`orderOrderId\`) REFERENCES \`order\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_ccd2fd288ac4e0ee2d34e1eb733\` FOREIGN KEY (\`productProductId\`) REFERENCES \`product\`(\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_ccd2fd288ac4e0ee2d34e1eb733\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_2b190f3c372c5100451c767a707\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
    }

}
