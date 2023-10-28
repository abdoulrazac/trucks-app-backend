import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1692798760236 implements MigrationInterface {
    name = 'UpdateUser1692798760236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isAssigned\` \`isAssigned\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isAssigned\` \`isAssigned\` tinyint NOT NULL`);
    }

}
