import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1698236419088 implements MigrationInterface {
    name = 'UpdateUser1698236419088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
    }

}
