import express, { Router } from 'express'
import client from './model.js'

const ventasRouter = express.Router()

ventasRouter.post('/orders', async (req, res) => {
  const { customerId, time, products, totalPriceOrder } = req.body

  if (!customerId || !time || !products || products.length === 0) {
    return res.status(400).json({ error: 'Por favor complete todos los campos del formulario y agregue al menos un producto al ticket.' })
  }

  try {
    const clientInsertResult = await client.execute({
      sql: 'INSERT INTO OrderTable (customerId, time, totalPriceOrder) VALUES (?, ?, ?)',
      args: [customerId, time, totalPriceOrder]
    })

    const result = await client.execute(
      'SELECT id FROM OrderTable ORDER BY id DESC LIMIT 1'
    )

    const maxId = result.rows[0].id
    // Usar el valor de maxId como necesites
    console.log('El máximo ID en la tabla OrderTable es:', maxId)

    for (const { productId, productName, productQuantity, productPrice, totalPrice } of products) {
      await client.execute({

        sql: 'INSERT INTO OrderProduct (productId,orderId, productName, productQuantity, productPrice, totalPrice) VALUES (?, ?, ?, ?, ?, ?)',
        args: [productId, maxId, productName, productQuantity, productPrice, totalPrice]
      })
    }

    res.status(201).json({ message: 'La orden de pedido se creó correctamente.' })
  } catch (error) {
    console.error('Error al crear la orden de pedido:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

// Obtener una orden por id
ventasRouter.get('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId

  try {
    // Obtener la información de la orden
    const orderResult = await client.execute({
      sql: 'SELECT * FROM OrderTable INNER JOIN Client ON OrderTable.customerId = Client.rif WHERE OrderTable.id = ?',
      args: [orderId]
    })

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'La orden especificada no fue encontrada.' })
    }

    const order = orderResult.rows[0]

    // Obtener los productos asociados a la orden
    const productsResult = await client.execute({
      sql: 'SELECT * FROM OrderProduct WHERE orderId = ?',
      args: [orderId]
    })

    const products = productsResult.rows

    // Combinar la información de la orden y los productos
    const orderWithProducts = {
      orderId: order.id,
      name: order.name,
      customerId: order.customerId,
      email: order.email,
      phoneNumber: order.phoneNumber,
      address: order.address,
      status: order.status,
      time: order.time,
      products,
      totalPriceOrder: order.totalPriceOrder
    }

    res.status(200).json(orderWithProducts)
  } catch (error) {
    console.error('Error al obtener la orden y los productos:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

// Obtener todas las ordenes
ventasRouter.get('/orders', async (req, res) => {
  try {
    // Obtener todas las órdenes
    const ordersResult = await client.execute(
      'SELECT * FROM OrderTable INNER JOIN Client ON OrderTable.customerId = Client.rif ORDER BY time DESC'
    )

    const orders = ordersResult.rows
    // Para cada orden, obtener los productos asociados
    const ordersWithProducts = await Promise.all(orders.map(async (order) => {
      const productsResult = await client.execute({
        sql: 'SELECT * FROM OrderProduct WHERE orderId = ?',
        args: [order.id]
      })
      const products = productsResult.rows
      return {
        orderId: order.id,
        name: order.name,
        customerId: order.customerId,
        email: order.email,
        phoneNumber: order.phoneNumber,
        address: order.address,
        status: order.status,
        time: order.time,
        products,
        totalPriceOrder: order.totalPriceOrder
      }
    }))

    res.status(200).json(ordersWithProducts)
  } catch (error) {
    console.error('Error al obtener todas las órdenes y sus productos:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

/* Esto devolvera una lista con todas las ordenes, el cual cada orden seguira la siguiente estructura

                [{orderId:,
                customerName: ,
                customerId: ,
                email: ,
                phoneNumber: ,
                status: ,
                time: ,
                products: [
                    {productId: ,orderId:,  productName: , quantity: , price: },{...},{...}
                ],
                totalPrice: }

                ,{...},{...}]

*/

// Modificar el status de una orden
ventasRouter.patch('/orders/:orderId/status', async (req, res) => {
  const orderId = req.params.orderId
  const { status } = req.body

  try {
    // Verificar si la orden existe
    const orderExistenceResult = await client.execute({
      sql: 'SELECT * FROM OrderTable WHERE id = ?',
      args: [orderId]
    })

    if (orderExistenceResult.rows.length === 0) {
      return res.status(404).json({ error: 'La orden especificada no fue encontrada.' })
    }

    // Actualizar el status de la orden
    const updateStatusResult = await client.execute({
      sql: 'UPDATE OrderTable SET status = ? WHERE id = ?',
      args: [status, orderId]
    })

    res.status(200).json({ message: 'El estado de la orden ha sido actualizado correctamente.' })
  } catch (error) {
    console.error('Error al actualizar el estado de la orden:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

// Nuevo endpoint para obtener la última orden
ventasRouter.get('/latestOrder', async (req, res) => {
  try {
    // Obtener la última orden
    const latestOrderResult = await client.execute(
      'SELECT * FROM OrderTable ORDER BY id DESC LIMIT 1'
    )

    if (latestOrderResult.rows.length === 0) {
      return res.status(404).json({ error: 'No hay órdenes disponibles.' })
    }

    const latestOrder = latestOrderResult.rows[0]

    // Obtener los productos asociados a la última orden
    const productsResult = await client.execute({
      sql: 'SELECT * FROM OrderProduct WHERE orderId = ?',
      args: [latestOrder.id]
    })

    const products = productsResult.rows

    // Combinar la información de la última orden y los productos
    const latestOrderWithProducts = {
      orderId: latestOrder.id,
      name: latestOrder.name,
      customerId: latestOrder.customerId,
      email: latestOrder.email,
      phoneNumber: latestOrder.phoneNumber,
      address: latestOrder.address,
      status: latestOrder.status,
      time: latestOrder.time,
      products,
      totalPrice: latestOrder.totalPriceOrder
    }

    res.status(200).json(latestOrderWithProducts)
  } catch (error) {
    console.error('Error al obtener la última orden y sus productos:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

// clientes
ventasRouter.get('/customer', async (req, res) => {
  try {
    const result = await client.execute(
      'SELECT * FROM Client'
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error al obtener los clientes:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

ventasRouter.post('/customer', async (req, res) => {
  const { name, email, phoneNumber, address, rif } = req.body

  if (!name || !email || !phoneNumber || !address || !rif) {
    return res.status(400).json({ error: 'Por favor complete todos los campos del formulario.' })
  }

  try {
    await client.execute({
      sql: 'INSERT INTO Client (name, email, phoneNumber, address, rif) VALUES (?, ?, ?, ?, ?)',
      args: [name, email, phoneNumber, address, rif]
    })

    res.status(201).json({ message: 'El cliente se creó correctamente.' })
  } catch (error) {
    console.log(error.code)
    if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
      return res.status(409).json({ error: 'El RIF ya está registrado con otro cliente' })
    }
    console.error('Error al crear el cliente:', error)
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
  }
})

export default ventasRouter
