import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715374833149 implements MigrationInterface {
    name = ' $npmConfigName1715374833149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`travelSteps\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`primePercent\` int NOT NULL, \`primeTravelLimit\` int NOT NULL, \`amount\` int NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NULL, \`isClosed\` tinyint NOT NULL DEFAULT 0, \`description\` varchar(255) NOT NULL, \`travelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`travelSteps\` ADD CONSTRAINT \`FK_c35556fa4cffdabeaa4333d8500\` FOREIGN KEY (\`travelId\`) REFERENCES \`travels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travelSteps\` DROP FOREIGN KEY \`FK_c35556fa4cffdabeaa4333d8500\``);
        await queryRunner.query(`DROP TABLE \`travelSteps\``);
    }

}
