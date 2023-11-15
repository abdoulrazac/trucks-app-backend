import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntities1700006589085 implements MigrationInterface {
    name = 'UpdateUserEntities1700006589085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`email_change\` (\`token\` varchar(255) NOT NULL, \`newEmail\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email_verification\` (\`token\` varchar(255) NOT NULL, \`newEmail\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`password_reset\` (\`token\` varchar(255) NOT NULL, \`newEmail\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`email_change\` ADD CONSTRAINT \`FK_60574205c2ff8ad4851c741de1a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_verification\` ADD CONSTRAINT \`FK_95b3bd492c85e471cd5e72277be\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`password_reset\` ADD CONSTRAINT \`FK_05baebe80e9f8fab8207eda250c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`password_reset\` DROP FOREIGN KEY \`FK_05baebe80e9f8fab8207eda250c\``);
        await queryRunner.query(`ALTER TABLE \`email_verification\` DROP FOREIGN KEY \`FK_95b3bd492c85e471cd5e72277be\``);
        await queryRunner.query(`ALTER TABLE \`email_change\` DROP FOREIGN KEY \`FK_60574205c2ff8ad4851c741de1a\``);
        await queryRunner.query(`DROP TABLE \`password_reset\``);
        await queryRunner.query(`DROP TABLE \`email_verification\``);
        await queryRunner.query(`DROP TABLE \`email_change\``);
    }

}
