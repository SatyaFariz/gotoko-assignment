import { MigrationInterface, QueryRunner } from "typeorm";

export class CashierTable1673097667570 implements MigrationInterface {
    name = 'CashierTable1673097667570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cashier\` (\`cashierId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`passcode\` varchar(6) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`cashierId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`cashier\``);
    }

}
