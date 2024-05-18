import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715627471924 implements MigrationInterface {
    name = ' $npmConfigName1715627471924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` ADD \`invoiceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD UNIQUE INDEX \`IDX_8f4e46fc03a15c3f39655981a7\` (\`invoiceId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8f4e46fc03a15c3f39655981a7\` ON \`finances\` (\`invoiceId\`)`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD CONSTRAINT \`FK_8f4e46fc03a15c3f39655981a7d\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` DROP FOREIGN KEY \`FK_8f4e46fc03a15c3f39655981a7d\``);
        await queryRunner.query(`DROP INDEX \`REL_8f4e46fc03a15c3f39655981a7\` ON \`finances\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP INDEX \`IDX_8f4e46fc03a15c3f39655981a7\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP COLUMN \`invoiceId\``);
    }

}
