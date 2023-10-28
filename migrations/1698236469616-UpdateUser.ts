import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1698236469616 implements MigrationInterface {
    name = 'UpdateUser1698236469616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(255) NOT NULL`);
    }

}
