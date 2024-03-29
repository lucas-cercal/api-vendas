import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOrderFieldtoOrders1705587565911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'order',
        type: 'int',
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'order');
  }
}
