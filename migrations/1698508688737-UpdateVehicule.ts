import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVehicule1698508688737 implements MigrationInterface {
    name = 'UpdateVehicule1698508688737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`color\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`model\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`vehicleType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`vehicleColor\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`vehicleModel\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`vehicleModel\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`vehicleColor\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`vehicleType\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`model\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`color\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`type\` varchar(255) NOT NULL`);
    }

}
