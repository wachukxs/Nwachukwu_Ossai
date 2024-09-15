import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1726365479571 implements MigrationInterface {
    // CREATE DATABASE [databasename];
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS posts (
                id INT NOT NULL PRIMARY KEY,
                title VARCHAR NOT NULL,
                content TEXT NOT NULL,
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS posts`,
        )
    }

}
