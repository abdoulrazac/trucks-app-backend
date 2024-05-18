import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715563194092 implements MigrationInterface {
    name = ' $npmConfigName1715563194092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_2a082dce34e0b09b984c17c4e30\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`expenseId\` \`financeId\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`finances\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`label\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`unitPrice\` int NOT NULL, \`unitNumber\` int NOT NULL, \`categories\` text NOT NULL, \`vehicleId\` int NULL, \`breakdownId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`code\` varchar(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_8bb1722ad02205a55fc9810d3dc\` FOREIGN KEY (\`financeId\`) REFERENCES \`finances\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD CONSTRAINT \`FK_781e88350b2b69ed4b36f51e8d1\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD CONSTRAINT \`FK_12d41b8cc00942e07dab175c00c\` FOREIGN KEY (\`breakdownId\`) REFERENCES \`breakdowns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP FOREIGN KEY \`FK_12d41b8cc00942e07dab175c00c\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP FOREIGN KEY \`FK_781e88350b2b69ed4b36f51e8d1\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_8bb1722ad02205a55fc9810d3dc\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`code\` varchar(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`DROP TABLE \`finances\``);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`financeId\` \`expenseId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_2a082dce34e0b09b984c17c4e30\` FOREIGN KEY (\`expenseId\`) REFERENCES \`expenses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
