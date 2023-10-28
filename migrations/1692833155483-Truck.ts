import { MigrationInterface, QueryRunner } from "typeorm";

export class Truck1692833155483 implements MigrationInterface {
    name = 'Truck1692833155483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_3858b5c2ca67c31124a7c3e4468\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_844588a2280c22b632b07fecfd2\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_ec1e295fe5e3a39ad312260ddd9\``);
        await queryRunner.query(`CREATE TABLE \`trucks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isClosed\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`conductorId\` int NULL, \`tractorId\` int NULL, \`semiTrailerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`conductorId\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`tractorId\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`semiTrailerId\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`truckId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_e03d1c334944ed40871703f8f2b\` FOREIGN KEY (\`truckId\`) REFERENCES \`trucks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD CONSTRAINT \`FK_5ab36f66e8e4500dd6358da2dcb\` FOREIGN KEY (\`conductorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD CONSTRAINT \`FK_ebc9fc572644843fd58b5c57bf3\` FOREIGN KEY (\`tractorId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trucks\` ADD CONSTRAINT \`FK_a278aae6800be215d1f217e5acb\` FOREIGN KEY (\`semiTrailerId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP FOREIGN KEY \`FK_a278aae6800be215d1f217e5acb\``);
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP FOREIGN KEY \`FK_ebc9fc572644843fd58b5c57bf3\``);
        await queryRunner.query(`ALTER TABLE \`trucks\` DROP FOREIGN KEY \`FK_5ab36f66e8e4500dd6358da2dcb\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_e03d1c334944ed40871703f8f2b\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`truckId\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`semiTrailerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`tractorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`conductorId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`trucks\``);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_ec1e295fe5e3a39ad312260ddd9\` FOREIGN KEY (\`semiTrailerId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_844588a2280c22b632b07fecfd2\` FOREIGN KEY (\`tractorId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_3858b5c2ca67c31124a7c3e4468\` FOREIGN KEY (\`conductorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
