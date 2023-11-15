import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategoryGroup1699048671329 implements MigrationInterface {
    name = 'UpdateCategoryGroup1699048671329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_ac0801a1760c5f9ce43c03bacd0\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` CHANGE \`categoryId\` \`categories\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`category_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`label\` varchar(200) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP COLUMN \`categories\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD \`categories\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`category_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP COLUMN \`categories\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD \`categories\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`DROP TABLE \`category_group\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` CHANGE \`categories\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_ac0801a1760c5f9ce43c03bacd0\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
