import { createClient } from '@libsql/client'
const Token = process.env.DB_MAN_TOKEN
const urlMan = process.env.mode === 'production' ? process.env.DB_MAN_URL : 'file:./backend/local.db'

const client = createClient({
  authToken: Token,
  url: urlMan
})

await client.execute(`
DROP TABLE IF EXISTS REQUISICION
`)
await client.execute(`
DROP TABLE IF EXISTS COMPRAS
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS REQUISICION (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INT NOT NULL,
    cantidad DECIMAL NOT NULL
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS COMPRAS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INT NOT NULL,
    cantidad DECIMAL NOT NULL
  )
`)

export default client
