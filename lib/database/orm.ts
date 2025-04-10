import { MikroORM } from "@mikro-orm/core"
import config from "./mikro-orm.config"

let orm: MikroORM

export async function getORM() {
  if (!orm) {
    try {
      orm = await MikroORM.init(config)
    } catch (error) {
      console.error("Failed to initialize MikroORM:", error)
      throw new Error("Database connection failed. Please check your environment variables and database configuration.")
    }
  }
  return orm
}

export async function getEntityManager() {
  try {
    const orm = await getORM()
    return orm.em.fork()
  } catch (error) {
    console.error("Failed to get entity manager:", error)
    throw error
  }
}
