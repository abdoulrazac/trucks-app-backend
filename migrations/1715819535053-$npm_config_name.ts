import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715819535053 implements MigrationInterface {
    name = ' $npmConfigName1715819535053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`description\``);
    }

}
