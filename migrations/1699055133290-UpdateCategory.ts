import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategory1699055133290 implements MigrationInterface {
    name = 'UpdateCategory1699055133290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`code\` \`code\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`code\` \`code\` varchar(20) NOT NULL DEFAULT ''`);
    }

}
