import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715628392305 implements MigrationInterface {
    name = ' $npmConfigName1715628392305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` CHANGE \`description\` \`description\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finances\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

}
