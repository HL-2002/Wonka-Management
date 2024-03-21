import express from 'express'
import client from './model.js'

const router = express.Router()

// Obtener todos los Almacenes
router.get('/warehouse', async (req, res) => {
  try {
    const { rows: warehouse } = await client.execute('SELECT * FROM WAREHOUSE')
    res.json(warehouse)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Obtener todos los productos
router.get('/products', async (req, res) => {
  try {
    const { rows: products } = await client.execute('SELECT * FROM PRODUCTS')
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Obtener todos los movimientos de inventario
router.get('/inventario', async (req, res) => {
  try {
    const { rows: products } = await client.execute('SELECT * FROM INVENTARIO')
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Obtener todos los productos
router.get('/category', async (req, res) => {
  try {
    const { rows: products } = await client.execute('SELECT * FROM CATEGORY')
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Crear un nuevo producto
router.post('/new/product', async (req, res) => {
  const { description, categoryId, ref, cost, pre, stock } = req.body

  const category = parseInt(categoryId)
  const referencia = ref || null
  const costo = cost || null
  const price = pre || null
  const units = stock || null

  try {
    await client.execute({ sql: 'INSERT INTO PRODUCTS (description, categoryId, ref, cost, price, stock) VALUES (?, ?, ?, ?, ?, ?)', args: [description, category, referencia, costo, price, units] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Movimiento de Inventario
router.post('/new/inventario', async (req, res) => {
  const { productId, motivo, tipo, units, total } = req.body

  const product = parseInt(productId)
  const motive = motivo || null
  const type = tipo || null
  const stock = units || null
  const totals = total || null

  try {
    await client.execute({ sql: 'INSERT INTO INVENTARIO (motivo, tipo, productId, stock, total) VALUES (?, ?, ?, ?, ?)', args: [motive, type, product, stock, totals] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Actualizar el stock de un producto
router.patch('/set/product/stock', async (req, res) => {
  const { productId, motivo, tipo, units, total, observacion } = req.body
  const product = parseInt(productId)
  const motiveValue = motivo || null
  const typeValue = tipo || null
  const stockValue = units || null
  const totalValue = total || null
  const observ = observacion || null

  try {
    // Insertar en la tabla INVENTARIO
    await client.execute({
      sql: 'INSERT INTO INVENTARIO (motivo, tipo, productId, stock, total, observacion) VALUES (?, ?, ?, ?, ?, ?)',
      args: [motiveValue, typeValue, product, stockValue, totalValue, observ]
    })
    // Actualizar el stock del producto
    const { rows: products } = await client.execute({
      sql: 'SELECT stock FROM PRODUCTS WHERE id = ?',
      args: [productId]
    })

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const currentStock = products[0].stock
    const newStock = tipo === 'CARGO' ? currentStock + parseInt(units) : currentStock - parseInt(units)

    await client.execute({
      sql: 'UPDATE PRODUCTS SET stock = ? WHERE id = ?',
      args: [newStock, productId]
    })

    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.patch('/set/product/stock/ventas', async (req, res) => {
  const { productId, motivo, tipo, units, total, observacion } = req.body
  const product = parseInt(productId)
  const motiveValue = motivo || null
  const typeValue = tipo || null
  const stockValue = units || null
  const totalValue = total || null
  const observ = observacion || null

  try {
    // Insertar en la tabla INVENTARIO
    await client.execute({
      sql: 'INSERT INTO INVENTARIO (motivo, tipo, productId, stock, total, observacion) VALUES (?, ?, ?, ?, ?, ?)',
      args: [motiveValue, typeValue, product, stockValue, totalValue, observ]
    })
    // Actualizar el stock del producto
    const { rows: products } = await client.execute({
      sql: 'SELECT stock FROM PRODUCTS WHERE id = ?',
      args: [productId]
    })

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const currentStock = products[0].stock
    const newStock = tipo === 'CARGO' ? currentStock + parseInt(units) : currentStock - parseInt(units)

    const currentStockC = products[0].comprometido
    const newStockC = tipo === 'CARGO' ? currentStockC + parseInt(units) : currentStockC - parseInt(units)

    await client.execute({
      sql: 'UPDATE PRODUCTS SET stock = ? WHERE id = ?',
      args: [newStockC, productId]
    })

    await client.execute({
      sql: 'UPDATE PRODUCTS SET comprometido = ? WHERE id = ?',
      args: [newStock, productId]
    })

    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Actualizar el stock comprometido de un producto
router.patch('/set/product/stock/comprometido', async (req, res) => {
  const { productId, tipo, units } = req.body
  const typeValue = tipo || null

  try {
    // Actualizar el stock del producto
    const { rows: products } = await client.execute({
      sql: 'SELECT comprometido FROM PRODUCTS WHERE id = ?',
      args: [productId]
    })

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const currentComprometido = products[0].comprometido
    const newComprometido = typeValue === 'CARGO' ? currentComprometido + parseInt(units) : currentComprometido - parseInt(units)

    await client.execute({
      sql: 'UPDATE PRODUCTS SET comprometido = ? WHERE id = ?',
      args: [newComprometido, productId]
    })

    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Actualizar la información de un producto
router.patch('/set/product/:id', async (req, res) => {
  const { id } = req.params
  const { description, categoryId, cost, pre } = req.body
  const category = categoryId
  const costo = cost || null
  const price = pre || null

  try {
    await client.execute({ sql: 'UPDATE PRODUCTS SET description = ?, categoryId = ?, cost = ?, price = ? WHERE id = ?', args: [description, category, costo, price, id] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Crear una nueva categoría
router.post('/new/category', async (req, res) => {
  const { description } = req.body
  try {
    await client.execute({ sql: 'INSERT INTO CATEGORY (description) VALUES (?)', args: [description] })
    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Actualizar la información de una categoría
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

// Crear un nuevo almacén
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

// Actualizar la información de un almacén
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

// Obtener un producto por ID
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

// Eliminar un producto por ID
router.delete('/products/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: products } = await client.execute({ sql: 'delete FROM PRODUCTS WHERE id = ?', args: [id] })
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Obtener un almacén por ID
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


// Obtener una categoría por ID
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

//Borrar categoria por id
router.delete('/category/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows: category } = await client.execute({ sql: 'delete FROM CATEGORY WHERE id = ?', args: [id] })
    res.json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


export default router
