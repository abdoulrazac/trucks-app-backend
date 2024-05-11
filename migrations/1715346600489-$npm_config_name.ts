import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715346600489 implements MigrationInterface {
    name = ' $npmConfigName1715346600489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`description\``);
    }

}
