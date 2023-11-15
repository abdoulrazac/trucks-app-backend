import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategory1699062935365 implements MigrationInterface {
    name = 'UpdateCategory1699062935365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ed8baf7745ad3c5a853af15d9bb\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`categoriesId\` \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`code\` \`code\` varchar(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_d0df92c67a392ee98c311e48ffe\` FOREIGN KEY (\`groupId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_d0df92c67a392ee98c311e48ffe\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`code\` \`code\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`groupId\` \`categoriesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ed8baf7745ad3c5a853af15d9bb\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
