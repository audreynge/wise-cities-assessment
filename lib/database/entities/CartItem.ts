import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Product } from "./Product";

@Entity()
export class CartItem {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
