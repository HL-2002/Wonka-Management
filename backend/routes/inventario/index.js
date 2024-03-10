import express from 'express'
import client from './model.js'

const router = express.Router()

router.get('/warehouse', async (req, res) => {
  try {
    const { rows: warehouse } = await client.execute({ sql: 'SELECT * FROM WAREHOUSE' })
    res.json(warehouse)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/products', async (req, res) => {
  try {
    const { rows: products } = await client.execute({ sql: 'SELECT * FROM PRODUCTS' })
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/category', async (req, res) => {
  try {
    const { rows: category } = await client.execute({ sql: 'SELECT * FROM CATEGORY' })
    res.json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/new/product', async (req, res) => {
  const { description, categoryId, ref, cost, price } = req.body[0]

  try {
    await client.execute({ sql: 'INSERT INTO PRODUCTS (description, categoryId, ref, cost, price) VALUES (?, ?, ?, ?)', args: [description, categoryId, ref, cost, price] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.patch('/set/product/:id', async (req, res) => {
  const { id } = req.params
  const { description, categoryId, ref, cost, price } = req.body
  try {
    await client.execute({ sql: 'UPDATE PRODUCTS SET description = ? categoryId = ? ref = ? cost = ? price = ? WHERE id = ?', args: [description, categoryId, ref, cost, price, id] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/new/category', async (req, res) => {
  const description = req.body
  try {
    await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: [description] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.patch('/set/category/:id', async (req, res) => {
  const { id } = req.params
  const { description } = req.body
  try {
    await client.execute({ sql: 'UPDATE CATEGORY SET description = ?  WHERE id = ?', args: [description, id] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/new/warehouse', async (req, res) => {
  const description = req.body
  try {
    await client.execute({ sql: 'INSERT INTO WAREHOUSE (description) VALUES (?)', args: [description] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.patch('/set/warehouse/:id', async (req, res) => {
  const { id } = req.params
  const { description } = req.body
  try {
    await client.execute({ sql: 'UPDATE WAREHOUSE SET description = ?  WHERE id = ?', args: [description, id] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/products/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: products } = await client.execute({ sql: 'SELECT * FROM PRODUCTS WHERE id = ?', args: [id] })
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/warehouse/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: warehouse } = await client.execute({ sql: 'SELECT * FROM WAREHOUSE WHERE id = ?', args: [id] })
    res.json(warehouse)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/category/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: category } = await client.execute({ sql: 'SELECT * FROM CATEGORY WHERE id = ?', args: [id] })
    res.json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
