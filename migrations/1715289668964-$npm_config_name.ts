import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715289668964 implements MigrationInterface {
    name = ' $npmConfigName1715289668964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refDriver\` \`refDriver\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`dateDriver\` \`dateDriver\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`dateDriver\` \`dateDriver\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refDriver\` \`refDriver\` varchar(255) NOT NULL`);
    }

}
