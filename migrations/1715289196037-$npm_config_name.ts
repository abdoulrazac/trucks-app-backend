import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715289196037 implements MigrationInterface {
    name = ' $npmConfigName1715289196037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Finances\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`label\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`unitPrice\` int NOT NULL, \`unitNumber\` int NOT NULL, \`categories\` text NOT NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`numImat\` varchar(100) NOT NULL, \`vehicleType\` varchar(255) NOT NULL, \`vehicleColor\` varchar(255) NOT NULL, \`brand\` varchar(255) NOT NULL, \`vehicleModel\` varchar(255) NOT NULL, \`volume\` int NOT NULL, \`axleNumber\` int NOT NULL, \`isAssigned\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`numImat\` (\`numImat\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`primePercent\` int NOT NULL, \`primeTravelLimit\` int NOT NULL, \`amount\` int NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NULL, \`isClosed\` tinyint NOT NULL DEFAULT 0, \`description\` varchar(255) NOT NULL, \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email_change\` (\`token\` varchar(255) NOT NULL, \`newEmail\` varchar(255) NOT NULL, \`validUntil\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email_verification\` (\`token\` varchar(255) NOT NULL, \`newEmail\` varchar(255) NOT NULL, \`validUntil\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`password_reset\` (\`token\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`email\` varchar(200) NOT NULL, \`password\` varchar(255) NOT NULL, \`username\` varchar(200) NOT NULL, \`roles\` text NOT NULL, \`isAccountDisabled\` tinyint NOT NULL DEFAULT 0, \`status\` varchar(255) NOT NULL, \`isAssigned\` tinyint NOT NULL DEFAULT 0, \`numTel\` varchar(255) NOT NULL, \`refDriver\` varchar(255) NOT NULL, \`dateDriver\` datetime NOT NULL, \`avatar\` varchar(255) NULL, \`attempts\` tinyint NOT NULL DEFAULT '0', UNIQUE INDEX \`email\` (\`email\`), UNIQUE INDEX \`username\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trucks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`isClosed\` tinyint NOT NULL DEFAULT 0, \`status\` varchar(255) NOT NULL, \`conductorId\` int NULL, \`tractorId\` int NULL, \`semiTrailerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travels\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refTravel\` varchar(100) NOT NULL, \`refUnloading\` varchar(100) NOT NULL, \`signatureDate\` datetime NULL, \`product\` varchar(100) NOT NULL, \`status\` varchar(255) NULL, \`departureDate\` datetime NULL, \`arrivalDate\` datetime NULL, \`departureCity\` varchar(255) NOT NULL, \`arrivalCity\` varchar(255) NOT NULL, \`truckWeight\` int NULL, \`departureWeight\` int NULL, \`arrivalWeight\` int NULL, \`companyId\` int NULL, \`invoiceId\` int NULL, \`truckId\` int NULL, UNIQUE INDEX \`refTravel\` (\`refTravel\`), UNIQUE INDEX \`refUnloading\` (\`refUnloading\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`numInvoice\` varchar(100) NOT NULL, \`unitPriceExtern\` int NOT NULL, \`unitPriceIntern\` int NOT NULL, \`valueTva\` int NOT NULL, \`valueRetain\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`companyId\` int NULL, UNIQUE INDEX \`numInvoice\` (\`numInvoice\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shortname\` varchar(200) NOT NULL, \`longname\` varchar(255) NOT NULL, \`email\` varchar(200) NOT NULL, \`numTel\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`numPostal\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`numRccm\` varchar(255) NOT NULL, \`numIfu\` varchar(255) NOT NULL, \`taxSystem\` varchar(255) NOT NULL, \`taxDivision\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, UNIQUE INDEX \`email\` (\`email\`), UNIQUE INDEX \`numRccm\` (\`numRccm\`), UNIQUE INDEX \`numIfu\` (\`numIfu\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`label\` varchar(200) NOT NULL, \`description\` varchar(255) NOT NULL, \`notification\` tinyint NOT NULL DEFAULT 0, \`categories\` text NOT NULL, \`extension\` varchar(255) NOT NULL, \`deliverAt\` datetime NULL, \`expireAt\` datetime NULL, \`size\` int NOT NULL, \`link\` varchar(255) NOT NULL, \`authorId\` int NULL, \`companyId\` int NULL, \`financeId\` int NULL, \`vehicleId\` int NULL, \`travelId\` int NULL, \`invoiceId\` int NULL, \`contractId\` int NULL, \`breakdownId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`breakdowns\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refBreakdown\` varchar(100) NOT NULL, \`type\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`occurredAt\` datetime NOT NULL, \`vehicleId\` int NULL, UNIQUE INDEX \`refBreakdown\` (\`refBreakdown\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(20) NOT NULL DEFAULT '', \`label\` varchar(200) NOT NULL, \`description\` varchar(255) NOT NULL, \`groupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Finances\` ADD CONSTRAINT \`FK_3af77b7ad6ceb7ff5d73663076c\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_f331a926f3a151bdf8aeb8431dd\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_change\` ADD CONSTRAINT \`FK_60574205c2ff8ad4851c741de1a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_verification\` ADD CONSTRAINT \`FK_95b3bd492c85e471cd5e72277be\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`password_reset\` ADD CONSTRAINT \`FK_05baebe80e9f8fab8207eda250c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD CONSTRAINT \`FK_5ab36f66e8e4500dd6358da2dcb\` FOREIGN KEY (\`conductorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD CONSTRAINT \`FK_ebc9fc572644843fd58b5c57bf3\` FOREIGN KEY (\`tractorId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD CONSTRAINT \`FK_a278aae6800be215d1f217e5acb\` FOREIGN KEY (\`semiTrailerId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_d042c2b938d1844d420b8128131\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_f75bee3936fd5abea0eda1fd760\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_e03d1c334944ed40871703f8f2b\` FOREIGN KEY (\`truckId\`) REFERENCES \`trucks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_0b793047e7030ef060eaae8438a\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_32dea8f8786e570f0ab35c82169\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_a330ae0dd450f91c6b9c7fda688\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_2a082dce34e0b09b984c17c4e30\` FOREIGN KEY (\`financeId\`) REFERENCES \`Finances\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_b4a0ee72f08ca1a42f5fbc70b28\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_901f41a8f62589b6c4f4c25148b\` FOREIGN KEY (\`travelId\`) REFERENCES \`travels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_2cb1ded21e968030f1a3203160a\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_a6d407eda78bcda52fc286410a8\` FOREIGN KEY (\`contractId\`) REFERENCES \`contracts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_30ca3bb303bfcb69d3b508b624d\` FOREIGN KEY (\`breakdownId\`) REFERENCES \`breakdowns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`breakdowns\` ADD CONSTRAINT \`FK_db2114094c27c3881e4038000e3\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`breakdowns\` DROP FOREIGN KEY \`FK_db2114094c27c3881e4038000e3\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_30ca3bb303bfcb69d3b508b624d\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_a6d407eda78bcda52fc286410a8\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_2cb1ded21e968030f1a3203160a\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_901f41a8f62589b6c4f4c25148b\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_b4a0ee72f08ca1a42f5fbc70b28\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_2a082dce34e0b09b984c17c4e30\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_a330ae0dd450f91c6b9c7fda688\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_32dea8f8786e570f0ab35c82169\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_0b793047e7030ef060eaae8438a\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_e03d1c334944ed40871703f8f2b\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_f75bee3936fd5abea0eda1fd760\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_d042c2b938d1844d420b8128131\``);
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP FOREIGN KEY \`FK_a278aae6800be215d1f217e5acb\``);
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP FOREIGN KEY \`FK_ebc9fc572644843fd58b5c57bf3\``);
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP FOREIGN KEY \`FK_5ab36f66e8e4500dd6358da2dcb\``);
        await queryRunner.query(`ALTER TABLE \`password_reset\` DROP FOREIGN KEY \`FK_05baebe80e9f8fab8207eda250c\``);
        await queryRunner.query(`ALTER TABLE \`email_verification\` DROP FOREIGN KEY \`FK_95b3bd492c85e471cd5e72277be\``);
        await queryRunner.query(`ALTER TABLE \`email_change\` DROP FOREIGN KEY \`FK_60574205c2ff8ad4851c741de1a\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_f331a926f3a151bdf8aeb8431dd\``);
        await queryRunner.query(`ALTER TABLE \`Finances\` DROP FOREIGN KEY \`FK_3af77b7ad6ceb7ff5d73663076c\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`refBreakdown\` ON \`breakdowns\``);
        await queryRunner.query(`DROP TABLE \`breakdowns\``);
        await queryRunner.query(`DROP TABLE \`files\``);
        await queryRunner.query(`DROP INDEX \`numIfu\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`numRccm\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`numInvoice\` ON \`invoices\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
        await queryRunner.query(`DROP INDEX \`refUnloading\` ON \`travels\``);
        await queryRunner.query(`DROP INDEX \`refTravel\` ON \`travels\``);
        await queryRunner.query(`DROP TABLE \`travels\``);
        await queryRunner.query(`DROP TABLE \`trucks\``);
        await queryRunner.query(`DROP INDEX \`username\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`password_reset\``);
        await queryRunner.query(`DROP TABLE \`email_verification\``);
        await queryRunner.query(`DROP TABLE \`email_change\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
        await queryRunner.query(`DROP INDEX \`numImat\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`Finances\``);
    }

}
