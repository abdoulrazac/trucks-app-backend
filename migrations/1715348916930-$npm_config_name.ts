import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715348916930 implements MigrationInterface {
    name = ' $npmConfigName1715348916930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`departureCountry\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`arrivalCountry\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`arrivalCountry\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`departureCountry\``);
    }

}
