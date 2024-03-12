import { createClient } from '@libsql/client'

const Token = process.env.DB_MAN_TOKEN
const urlMan = process.env.mode === 'production' ? process.env.DB_MAN_URL : 'file:./backend/local.db'

const client = createClient({
  authToken: Token,
  url: urlMan
})

// create the tables

// if (process.env.mode !== 'production') {
//   await client.execute(`
//     DROP TABLE IF EXISTS PRODUCTS
//   `)
//   await client.execute(`
//     DROP TABLE IF EXISTS WAREHOUSE
//   `)
//   await client.execute(`
//     DROP TABLE IF EXISTS CATEGORY
//   `)
// }

await client.execute(`
  CREATE TABLE IF NOT EXISTS WAREHOUSE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS CATEGORY (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS PRODUCTS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryId INTEGER NOT NULL,
    description TEXT NOT NULL,
    ref TEXT,
    cost TEXT,
    price TEXT,
    stock DECIMAL,
    FOREIGN KEY (categoryId) REFERENCES CATEGORY(id)

    
  )
`)

export default client
