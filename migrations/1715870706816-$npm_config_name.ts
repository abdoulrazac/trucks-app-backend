import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715870706816 implements MigrationInterface {
    name = ' $npmConfigName1715870706816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`primePercent\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`primePercent\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`amount\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP COLUMN \`unitPrice\``);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD \`unitPrice\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`truckWeight\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`truckWeight\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`departureWeight\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`departureWeight\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`arrivalWeight\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`arrivalWeight\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPriceExtern\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPriceExtern\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPriceIntern\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPriceIntern\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`valueTva\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`valueTva\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`valueRetain\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`valueRetain\` float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`valueRetain\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`valueRetain\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`valueTva\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`valueTva\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPriceIntern\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPriceIntern\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`unitPriceExtern\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`unitPriceExtern\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`arrivalWeight\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`arrivalWeight\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`departureWeight\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`departureWeight\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`truckWeight\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`truckWeight\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP COLUMN \`unitPrice\``);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD \`unitPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`primePercent\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`primePercent\` int NOT NULL`);
    }

}
