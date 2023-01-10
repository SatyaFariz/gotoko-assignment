import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1673376568721 implements MigrationInterface {
    name = 'NewMigration1673376568721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cashier\` (\`cashierId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`passcode\` varchar(6) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`cashierId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`categoryId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`paymentId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`logo\` varchar(255) NULL, \`type\` enum ('CASH', 'E-WALLET', 'EDC') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`paymentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`orderId\` int NOT NULL AUTO_INCREMENT, \`isDownload\` tinyint NOT NULL DEFAULT 1, \`paymentPaymentId\` int NOT NULL, \`totalPaid\` int NOT NULL, \`totalPrice\` int NOT NULL, \`totalReturn\` int NOT NULL, \`receiptId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cashierCashierId\` int NULL, PRIMARY KEY (\`orderId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`discount\` (\`discountId\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, \`result\` int NOT NULL, \`expiredAt\` datetime NOT NULL, \`type\` enum ('BUY_N', 'PERCENT') NOT NULL, PRIMARY KEY (\`discountId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`productId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`sku\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`categoryCategoryId\` int NOT NULL, \`stock\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`discountDiscountId\` int NULL, UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`), UNIQUE INDEX \`REL_71d8bbc56a43618ed5e26e67b4\` (\`discountDiscountId\`), PRIMARY KEY (\`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`orderItemId\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, \`orderOrderId\` int NOT NULL, \`productProductId\` int NOT NULL, \`unitPrice\` int NOT NULL, \`totalNormalPrice\` int NOT NULL, \`totalFinalPrice\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`discountDiscountId\` int NULL, PRIMARY KEY (\`orderItemId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_decfcb4e513e17f436ee585f794\` FOREIGN KEY (\`paymentPaymentId\`) REFERENCES \`payment\`(\`paymentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_ca6bbc9a70142b209a499f8b69b\` FOREIGN KEY (\`cashierCashierId\`) REFERENCES \`cashier\`(\`cashierId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_71d8bbc56a43618ed5e26e67b4f\` FOREIGN KEY (\`discountDiscountId\`) REFERENCES \`discount\`(\`discountId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_8b4d0e2be5e945a828f313b4f30\` FOREIGN KEY (\`categoryCategoryId\`) REFERENCES \`category\`(\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_2b190f3c372c5100451c767a707\` FOREIGN KEY (\`orderOrderId\`) REFERENCES \`order\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_ccd2fd288ac4e0ee2d34e1eb733\` FOREIGN KEY (\`productProductId\`) REFERENCES \`product\`(\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_4a0ad65dea40db2531485ee9488\` FOREIGN KEY (\`discountDiscountId\`) REFERENCES \`discount\`(\`discountId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_4a0ad65dea40db2531485ee9488\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_ccd2fd288ac4e0ee2d34e1eb733\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_2b190f3c372c5100451c767a707\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_8b4d0e2be5e945a828f313b4f30\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_71d8bbc56a43618ed5e26e67b4f\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_ca6bbc9a70142b209a499f8b69b\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_decfcb4e513e17f436ee585f794\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP INDEX \`REL_71d8bbc56a43618ed5e26e67b4\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`discount\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`cashier\``);
    }

}
