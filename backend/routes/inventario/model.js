import { createClient } from '@libsql/client'

const Token = process.env.DB_MAN_TOKEN
const urlMan = process.env.mode === 'production' ? process.env.DB_MAN_URL : 'file:./backend/local.db'

const client = createClient({
  authToken: Token,
  url: urlMan
})

// create the tables

if (process.env.mode !== 'production') {
  await client.execute(`
    DROP TABLE IF EXISTS PRODUCTS
  `)
  await client.execute(`
    DROP TABLE IF EXISTS WAREHOUSE
  `)
  await client.execute(`
    DROP TABLE IF EXISTS CATEGORY
  `)
}

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

if (process.env.mode !== 'production') {
  await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: ['Materia Prima'] })
  await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: ['Producto Final'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Wonka Bar', '', '10', '12', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Candied Apple', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Wonka Swirl Lollipops', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Bluebirds egg candy', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Rompemuelas eterno', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Three-course dinner gum', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Stained-glass hard candy', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Wonka whipple-scrumptious fudgemallow delight', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Wonka nutty chocolate surprise', '', '8', '15', '0'] })
  await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'Edible grass', '', '8', '15', '0'] })
}
export default client
