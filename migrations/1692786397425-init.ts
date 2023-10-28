import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692786397425 implements MigrationInterface {
    name = 'Init1692786397425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`numInvoice\` varchar(100) NOT NULL, \`unitPrice\` varchar(255) NOT NULL, \`valueTva\` int NOT NULL, \`valueRetain\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` int NULL, UNIQUE INDEX \`numInvoice\` (\`numInvoice\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`shortname\` varchar(200) NOT NULL, \`longname\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`numTel\` varchar(255) NOT NULL, \`numPostal\` varchar(255) NOT NULL, \`numRccm\` varchar(255) NOT NULL, \`numIfu\` varchar(255) NOT NULL, \`taxSystem\` varchar(255) NOT NULL, \`taxDivision\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`email\` varchar(200) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`numRccm\` (\`numRccm\`), UNIQUE INDEX \`numIfu\` (\`numIfu\`), UNIQUE INDEX \`email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(200) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`unitPrice\` int NOT NULL, \`unitNumber\` int NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` int NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`numImat\` varchar(100) NOT NULL, \`type\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`volume\` int NOT NULL, \`axleNumber\` int NOT NULL, \`isAssigned\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`numImat\` (\`numImat\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travels\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refTravel\` varchar(100) NOT NULL, \`product\` varchar(100) NOT NULL, \`departureDate\` datetime NOT NULL, \`arrivalDate\` datetime NOT NULL, \`departureCity\` varchar(255) NOT NULL, \`arrivalCity\` varchar(255) NOT NULL, \`departureWeight\` int NOT NULL, \`arrivalWeight\` int NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` int NULL, \`invoiceId\` int NULL, \`conductorId\` int NULL, \`tractorId\` int NULL, \`semiTrailerId\` int NULL, UNIQUE INDEX \`refTravel\` (\`refTravel\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`primePercent\` int NOT NULL, \`primeTravelLimit\` int NOT NULL, \`amount\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`isClosed\` tinyint NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`username\` varchar(200) NOT NULL, \`roles\` text NOT NULL, \`isAccountDisabled\` tinyint NOT NULL, \`isAssigned\` tinyint NOT NULL, \`email\` varchar(200) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`username\` (\`username\`), UNIQUE INDEX \`email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`post\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_0b793047e7030ef060eaae8438a\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_ac0801a1760c5f9ce43c03bacd0\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_3af77b7ad6ceb7ff5d73663076c\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_d042c2b938d1844d420b8128131\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_f75bee3936fd5abea0eda1fd760\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_3858b5c2ca67c31124a7c3e4468\` FOREIGN KEY (\`conductorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_844588a2280c22b632b07fecfd2\` FOREIGN KEY (\`tractorId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_ec1e295fe5e3a39ad312260ddd9\` FOREIGN KEY (\`semiTrailerId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_f331a926f3a151bdf8aeb8431dd\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_65d9ccc1b02f4d904e90bd76a34\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_65d9ccc1b02f4d904e90bd76a34\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_f331a926f3a151bdf8aeb8431dd\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_ec1e295fe5e3a39ad312260ddd9\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_844588a2280c22b632b07fecfd2\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_3858b5c2ca67c31124a7c3e4468\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_f75bee3936fd5abea0eda1fd760\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_d042c2b938d1844d420b8128131\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_3af77b7ad6ceb7ff5d73663076c\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_ac0801a1760c5f9ce43c03bacd0\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_0b793047e7030ef060eaae8438a\``);
        await queryRunner.query(`DROP TABLE \`articles\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`username\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
        await queryRunner.query(`DROP INDEX \`refTravel\` ON \`travels\``);
        await queryRunner.query(`DROP TABLE \`travels\``);
        await queryRunner.query(`DROP INDEX \`numImat\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`expenses\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`numIfu\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`numRccm\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`numInvoice\` ON \`invoices\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
    }

}
