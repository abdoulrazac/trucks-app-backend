import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715461671034 implements MigrationInterface {
    name = ' $npmConfigName1715461671034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`travel_check_point\` (\`travelId\` int NOT NULL, \`checkPointId\` int NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`travelId\`, \`checkPointId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD \`routeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travel_check_point\` ADD CONSTRAINT \`FK_941fe4b8acefa58b495d4f3db06\` FOREIGN KEY (\`checkPointId\`) REFERENCES \`checkPoints\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_check_point\` ADD CONSTRAINT \`FK_3e2c7ff08a4ed777f6744539785\` FOREIGN KEY (\`travelId\`) REFERENCES \`travels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkPoints\` ADD CONSTRAINT \`FK_fd2ee5048d1699263683a5154f1\` FOREIGN KEY (\`routeId\`) REFERENCES \`routes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travels\` ADD CONSTRAINT \`FK_f5afe8a2016b01e5317942b4425\` FOREIGN KEY (\`routeId\`) REFERENCES \`routes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`travels\` DROP FOREIGN KEY \`FK_f5afe8a2016b01e5317942b4425\``);
        await queryRunner.query(`ALTER TABLE \`checkPoints\` DROP FOREIGN KEY \`FK_fd2ee5048d1699263683a5154f1\``);
        await queryRunner.query(`ALTER TABLE \`travel_check_point\` DROP FOREIGN KEY \`FK_3e2c7ff08a4ed777f6744539785\``);
        await queryRunner.query(`ALTER TABLE \`travel_check_point\` DROP FOREIGN KEY \`FK_941fe4b8acefa58b495d4f3db06\``);
        await queryRunner.query(`ALTER TABLE \`travels\` DROP COLUMN \`routeId\``);
        await queryRunner.query(`DROP TABLE \`travel_check_point\``);
    }

}
