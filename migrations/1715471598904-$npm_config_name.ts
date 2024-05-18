import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715471598904 implements MigrationInterface {
    name = ' $npmConfigName1715471598904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`routes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`routes\` ADD \`code\` varchar(100) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`routes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`routes\` ADD \`code\` varchar(20) NOT NULL DEFAULT ''`);
    }

}
