import type { Options } from "@mikro-orm/core"
import { TSMigrationGenerator } from "@mikro-orm/migrations"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { Product } from "./entities/Product"
import { CartItem } from "./entities/CartItem"
import dotenv from "dotenv"

dotenv.config()

const config: Options = {
  entities: [Product, CartItem],
  dbName: process.env.DB_NAME,
  driver: PostgreSqlDriver,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 5432,
  migrations: {
    tableName: "mikro_orm_migrations",
    path: "./lib/database/migrations",
    glob: "!(*.d).{js,ts}",
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    generator: TSMigrationGenerator,
  },
  seeder: {
    path: "./lib/database/seeders",
    defaultSeeder: "DatabaseSeeder",
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    fileName: (className: string) => className,
  },
}

export default config
