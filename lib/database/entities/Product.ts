import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 } from "uuid"

@Entity()
export class Product {
  @PrimaryKey()
  id: string = v4()

  @Property()
  name!: string

  @Property({ type: "text" })
  description!: string

  @Property()
  price!: number

  @Property()
  imageUrl!: string

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
