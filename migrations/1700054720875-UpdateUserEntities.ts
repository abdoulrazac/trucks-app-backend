import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntities1700054720875 implements MigrationInterface {
    name = 'UpdateUserEntities1700054720875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_change\` CHANGE \`createdAt\` \`validUntil\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_verification\` CHANGE \`createdAt\` \`validUntil\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`password_reset\` CHANGE \`createdAt\` \`validUntil\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_change\` CHANGE \`validUntil\` \`validUntil\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_verification\` CHANGE \`validUntil\` \`validUntil\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`password_reset\` CHANGE \`validUntil\` \`validUntil\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`password_reset\` CHANGE \`validUntil\` \`validUntil\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_verification\` CHANGE \`validUntil\` \`validUntil\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_change\` CHANGE \`validUntil\` \`validUntil\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`password_reset\` CHANGE \`validUntil\` \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_verification\` CHANGE \`validUntil\` \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_change\` CHANGE \`validUntil\` \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
