import express from 'express';
import client from './model.js';

const ventasRouter = express.Router();

ventasRouter.post('/orders', async (req, res) => {
    const { name, customerId, email, shipping, products } = req.body;
   
    

    if (!name || !customerId || !email || !shipping || !products || products.length === 0) {
        return res.status(400).json({ error: 'Por favor complete todos los campos del formulario y agregue al menos un producto al ticket.' });
    }

    try {
        const clientInsertResult = await client.execute({
            sql: 'INSERT INTO OrderTable (customerName, customerId, email, shipping) VALUES (?, ?, ?, ?)',
            args: [name, customerId, email, shipping]
        });

        const result = await client.execute({
            sql: 'SELECT last_insert_rowid() AS orderId'
        });
    
        const orderId = result.rows[0].orderId;

        for (const { productName, quantity } of products) {
            await client.execute({
                sql: 'INSERT INTO OrderProduct (orderId, productName, quantity) VALUES (?, ?, ?)',
                args: [orderId, productName, quantity]
            });
        }

        res.status(201).json({ message: 'La orden de pedido se creó correctamente.' });
    } catch (error) {
        console.error('Error al crear la orden de pedido:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});

//Obtener una orden por id
ventasRouter.get('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Obtener la información de la orden
        const orderResult = await client.execute({
            sql: 'SELECT * FROM OrderTable WHERE id = ?',
            args: [orderId]
        });

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'La orden especificada no fue encontrada.' });
        }

        const order = orderResult.rows[0];

        // Obtener los productos asociados a la orden
        const productsResult = await client.execute({
            sql: 'SELECT * FROM OrderProduct WHERE orderId = ?',
            args: [orderId]
        });

        const products = productsResult.rows;

        // Combinar la información de la orden y los productos
        const orderWithProducts = {
            orderId: order.id,
            customerName: order.customerName,
            customerId: order.customerId,
            email: order.email,
            shipping: order.shipping,
            status: order.status,
            products: products
        };

        res.status(200).json(orderWithProducts);
    } catch (error) {
        console.error('Error al obtener la orden y los productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});

//Obtener todas las ordenes
ventasRouter.get('/orders', async (req, res) => {
    try {
        // Obtener todas las órdenes
        const ordersResult = await client.execute({
            sql: 'SELECT * FROM OrderTable'
        });

        const orders = ordersResult.rows;

        // Para cada orden, obtener los productos asociados
        const ordersWithProducts = await Promise.all(orders.map(async (order) => {
            const productsResult = await client.execute({
                sql: 'SELECT * FROM OrderProduct WHERE orderId = ?',
                args: [order.id]
            });
            const products = productsResult.rows;
            return {
                orderId: order.id,
                customerName: order.customerName,
                customerId: order.customerId,
                email: order.email,
                shipping: order.shipping,
                status: order.status,
                products: products
            };
        }));

        res.status(200).json(ordersWithProducts);
    } catch (error) {
        console.error('Error al obtener todas las órdenes y sus productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});


export default ventasRouter;
