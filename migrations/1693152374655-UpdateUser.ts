import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1693152374655 implements MigrationInterface {
    name = 'UpdateUser1693152374655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`invoiceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`numTel\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_2cb1ded21e968030f1a3203160a\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_2cb1ded21e968030f1a3203160a\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`numTel\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`invoiceId\``);
    }

}
