import express from 'express';
import client from './model.js';

const ventasRouter = express.Router();

ventasRouter.post('/orders', async (req, res) => {
    const { name, customerId, email, phoneNumber,time, products ,totalPrice} = req.body;
   
    

    if (!name || !customerId || !email || !phoneNumber || !time   || !products || products.length === 0) {
        return res.status(400).json({ error: 'Por favor complete todos los campos del formulario y agregue al menos un producto al ticket.' });
    }

    try {
        const clientInsertResult = await client.execute({
            sql: 'INSERT INTO OrderTable (customerName, customerId, email, phoneNumber, time, totalPrice) VALUES (?, ?, ?, ?, ?, ?)',
            args: [name, customerId, email, phoneNumber, time, totalPrice ]
        });

        const result = await client.execute({
            sql: 'SELECT last_insert_rowid() AS orderId'
        });
        const orderId = result.rows[0].orderId;
        for (const { productName, quantity, price} of products) {
            await client.execute({
                
                sql: 'INSERT INTO OrderProduct (orderId, productName, quantity, price) VALUES (?, ?, ?, ?)',
                args: [orderId, productName, quantity, price]
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
            phoneNumber: order.phoneNumber,
            status: order.status,
            time: order.time,
            products: products,
            totalPrice:order.totalPrice
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
                phoneNumber: order.phoneNumber,
                status: order.status,
                time: order.time,
                products: products,
                totalPrice:order.totalPrice
            };
        }));

        res.status(200).json(ordersWithProducts);
    } catch (error) {
        console.error('Error al obtener todas las órdenes y sus productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});

// Modificar el status de una orden
ventasRouter.patch('/orders/:orderId/status', async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;

    try {
        // Verificar si la orden existe
        const orderExistenceResult = await client.execute({
            sql: 'SELECT * FROM OrderTable WHERE id = ?',
            args: [orderId]
        });

        if (orderExistenceResult.rows.length === 0) {
            return res.status(404).json({ error: 'La orden especificada no fue encontrada.' });
        }

        // Actualizar el status de la orden
        const updateStatusResult = await client.execute({
            sql: 'UPDATE OrderTable SET status = ? WHERE id = ?',
            args: [status, orderId]
        });

        res.status(200).json({ message: 'El estado de la orden ha sido actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar el estado de la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});



export default ventasRouter;
