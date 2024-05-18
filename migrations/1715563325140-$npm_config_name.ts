import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715563325140 implements MigrationInterface {
    name = ' $npmConfigName1715563325140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`code\` varchar(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`code\` varchar(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
