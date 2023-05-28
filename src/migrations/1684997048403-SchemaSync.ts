import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1684997048403 implements MigrationInterface {
  name = 'SchemaSync1684997048403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ALTER COLUMN "brand" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ALTER COLUMN "brand" SET NOT NULL`,
    );
  }
}
