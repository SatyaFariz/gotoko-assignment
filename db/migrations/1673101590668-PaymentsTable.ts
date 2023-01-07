import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentsTable1673101590668 implements MigrationInterface {
    name = 'PaymentsTable1673101590668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment\` (\`paymentId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`logo\` varchar(255) NULL, \`type\` enum ('CASH', 'E-WALLET', 'EDC') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`paymentId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`payment\``);
    }

}
