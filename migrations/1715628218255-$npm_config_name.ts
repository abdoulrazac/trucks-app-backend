import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715628218255 implements MigrationInterface {
    name = ' $npmConfigName1715628218255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8f4e46fc03a15c3f39655981a7\` ON \`finances\``);
        await queryRunner.query(`ALTER TABLE \`finances\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8f4e46fc03a15c3f39655981a7\` ON \`finances\` (\`invoiceId\`)`);
    }

}
