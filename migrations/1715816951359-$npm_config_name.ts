import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715816951359 implements MigrationInterface {
    name = ' $npmConfigName1715816951359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD \`refContract\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD UNIQUE INDEX \`IDX_f81525197cd979a93a372bdbb3\` (\`refContract\`)`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD \`transactionRef\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD \`invoiceDate\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP COLUMN \`invoiceDate\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP COLUMN \`transactionRef\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP INDEX \`IDX_f81525197cd979a93a372bdbb3\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP COLUMN \`refContract\``);
    }

}
