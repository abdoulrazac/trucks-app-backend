import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateContract1692795265177 implements MigrationInterface {
    name = 'UpdateContract1692795265177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` CHANGE \`isClosed\` \`isClosed\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` CHANGE \`isClosed\` \`isClosed\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`amount\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`description\``);
    }

}
