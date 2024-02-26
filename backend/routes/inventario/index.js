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
  const { description, categoryId, ref, cost, price } = req.body
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

export default router
