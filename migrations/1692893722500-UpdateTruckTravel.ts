import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTruckTravel1692893722500 implements MigrationInterface {
    name = 'UpdateTruckTravel1692893722500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPrice\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPriceExtern\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPriceIntern\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`signatureDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`signatureDate\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPriceIntern\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPriceExtern\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPrice\` varchar(255) NOT NULL`);
    }

}
