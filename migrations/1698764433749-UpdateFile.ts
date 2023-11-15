import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFile1698764433749 implements MigrationInterface {
    name = 'UpdateFile1698764433749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`cetegory\` \`category\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`category\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`category\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`category\` \`cetegory\` varchar(255) NOT NULL`);
    }

}
