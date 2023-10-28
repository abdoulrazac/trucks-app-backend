import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1697297426999 implements MigrationInterface {
    name = 'UpdateUser1697297426999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isAccountDisabled\` \`isAccountDisabled\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isAccountDisabled\` \`isAccountDisabled\` tinyint NOT NULL`);
    }

}
