import { Migration } from '@mikro-orm/migrations';

export class Migration20250410042050 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "cart_item" alter column "id" drop default;`);
    this.addSql(`alter table "cart_item" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "cart_item" alter column "id" set default uuid_generate_v4();`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "cart_item" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "cart_item" alter column "id" drop default;`);
    this.addSql(`alter table "cart_item" alter column "id" type varchar(255) using ("id"::varchar(255));`);
  }

}
