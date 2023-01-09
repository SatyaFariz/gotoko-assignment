import { MigrationInterface, QueryRunner } from "typeorm";

export class IsDownload1673305757250 implements MigrationInterface {
    name = 'IsDownload1673305757250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_decfcb4e513e17f436ee585f794\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`isDownload\` \`isDownload\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`paymentPaymentId\` \`paymentPaymentId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_ccd2fd288ac4e0ee2d34e1eb733\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`productProductId\` \`productProductId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_decfcb4e513e17f436ee585f794\` FOREIGN KEY (\`paymentPaymentId\`) REFERENCES \`payment\`(\`paymentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_ccd2fd288ac4e0ee2d34e1eb733\` FOREIGN KEY (\`productProductId\`) REFERENCES \`product\`(\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_ccd2fd288ac4e0ee2d34e1eb733\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_decfcb4e513e17f436ee585f794\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`productProductId\` \`productProductId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_ccd2fd288ac4e0ee2d34e1eb733\` FOREIGN KEY (\`productProductId\`) REFERENCES \`product\`(\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`paymentPaymentId\` \`paymentPaymentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`isDownload\` \`isDownload\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_decfcb4e513e17f436ee585f794\` FOREIGN KEY (\`paymentPaymentId\`) REFERENCES \`payment\`(\`paymentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
