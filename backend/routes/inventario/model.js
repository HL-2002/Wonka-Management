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
  DROP TABLE IF EXISTS INVENTARIO
`)
  await client.execute(`
    DROP TABLE IF EXISTS PRODUCTS
  `)
  await client.execute(`
    DROP TABLE IF EXISTS WAREHOUSE
  `)
  await client.execute(`
    DROP TABLE IF EXISTS CATEGORY
  `)
  await client.execute(`
  CREATE TABLE IF NOT EXISTS WAREHOUSE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
  )
`)
}

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
    cost DECIMAL DEFAULT 0,
    price DECIMAL DEFAULT 0,
    stock DECIMAL DEFAULT 0,
    comprometido DECIMAL DEFAULT 0,
    FOREIGN KEY (categoryId) REFERENCES CATEGORY(id)
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS INVENTARIO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motivo TEXT NOT NULL,
    tipo TEXT NOT NULL,
    productId INTEGER NOT NULL,
    stock DECIMAL NOT NULL,
    total DECIMAL,
    observacion TEXT,
    FOREIGN KEY (productId) REFERENCES PRODUCTS(id)
  )
`)
try {
  const { rows: products } = await client.execute('SELECT * FROM PRODUCTS')
  if (products.length <= 0) {
    await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: ['Materia Prima'] })
    await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: ['Producto Final'] })
    await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: ['Mantenimiento'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Wonka Bar', '', '10', '12', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Candied Apple', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Wonka Swirl Lollipops', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Bluebirds egg candy', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Rompemuelas eterno', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Three-course dinner gum', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Stained-glass hard candy', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Wonka whipple-scrumptious fudgemallow delight', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Wonka nutty chocolate surprise', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['2', 'Edible grass', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'cacao', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'chocolate negro', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'chocolate con leche', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'manzana', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'azucar', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'jarabe de maiz', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'chocolate negro', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'taza de almendras', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'QUESO CREMA', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'MANTEQUILLA DE MANI', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'COCO', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'CHISPAS DE CHOCOLATE', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'HARINA', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'CHOCOLATE SEMIDULCE', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'LECHE CONDENSADA', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'LECHE', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?, ?,?,?,?,?)', args: ['1', 'MALVADISCO', '', '8', '15', '0'] })
    await client.execute({ sql: 'INSERT INTO PRODUCTS (categoryId, description, ref, cost, price, stock) VALUES (?,?,?, ?, ?, ?)', args: ['3', 'Aceite', '', '540', '0', '0'] })
  }
} catch (error) {
  console.log('Error de Carga incial de Inventario')
}
export default client
/* ID DE MATERIA PRIMA con su unidad
    11 CACAO gramos
    12 CHOCOLATE NEGRO gramos
    13 CHOCOLATE CON LECHE gramos
    14 MANZANA unidad
    15 AZUCAR gramos
    16 JARABE DE MAIZ ml
    17 CHOCOLATE NEGRO gramos
    18 TAZA de ALMENDRAS gramos
    19 QUESO CREMA ml
    20 MANTEQUILLA DE MANI gramos
    21 COCO gramos
    22 CHISPAS DE CHOCOLATE gramos
    23 HARINA gramos
    24 CHOCOLATE SEMIDULCE gramos
    25 LECHE CONDENSADA ml
    26 LECHE ml
    27 MALVADISCO gramos
    */
