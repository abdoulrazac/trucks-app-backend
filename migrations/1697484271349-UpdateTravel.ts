import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTravel1697484271349 implements MigrationInterface {
    name = 'UpdateTravel1697484271349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`travelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_901f41a8f62589b6c4f4c25148b\` FOREIGN KEY (\`travelId\`) REFERENCES \`travels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_901f41a8f62589b6c4f4c25148b\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`travelId\``);
    }

}
