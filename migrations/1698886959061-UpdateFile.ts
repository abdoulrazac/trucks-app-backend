import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFile1698886959061 implements MigrationInterface {
    name = 'UpdateFile1698886959061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`category\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`category\` varchar(255) NOT NULL`);
    }

}
