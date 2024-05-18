import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715605772698 implements MigrationInterface {
    name = ' $npmConfigName1715605772698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD CONSTRAINT \`FK_29d58d04e6b88654ede43247667\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` DROP FOREIGN KEY \`FK_29d58d04e6b88654ede43247667\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP COLUMN \`userId\``);
    }

}
