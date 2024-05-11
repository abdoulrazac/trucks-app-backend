import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715301403503 implements MigrationInterface {
    name = ' $npmConfigName1715301403503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`breakdowns\` CHANGE \`occuredAt\` \`occurredAt\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`breakdowns\` CHANGE \`occurredAt\` \`occuredAt\` datetime NOT NULL`);
    }

}
