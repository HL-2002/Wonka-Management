import express from 'express'
import client from './model.js'

const router = express.Router()

// REUISICIONES

router.get('/requisicion', async (req, res) => {
  try {
    const { rows: products } = await client.execute('SELECT * FROM REQUISICION')
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/new/requisicion', async (req, res) => {
  const { productValue, cantidadValue } = req.body
  try {
    await client.execute({ sql: 'INSERT INTO REQUISICION (productId, cantidad) VALUES (?, ?)', args: [productValue, cantidadValue] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Eliminar un producto por ID
router.delete('/requisicion/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: products } = await client.execute({ sql: 'delete FROM REQUISICION WHERE id = ?', args: [id] })
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// COMPRAS

router.get('/compras', async (req, res) => {
  try {
    const { rows: products } = await client.execute('SELECT * FROM COMPRAS')
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/new/compra', async (req, res) => {
  const { productValue, cantidadValue } = req.body
  try {
    await client.execute({ sql: 'INSERT INTO COMPRAS (productId, cantidad) VALUES (?, ?)', args: [productValue, cantidadValue] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Eliminar un producto por ID
router.delete('/compras/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: products } = await client.execute({ sql: 'delete FROM COMPRAS WHERE id = ?', args: [id] })
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
