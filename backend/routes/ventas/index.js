import express from 'express';
import client from './model.js';

const ventasRouter = express.Router();

ventasRouter.post('/orders', async (req, res) => {
    const { name, customerId, email, phoneNumber,time, products ,totalPriceOrder} = req.body;
   
    

    if (!name || !customerId || !email || !phoneNumber || !time   || !products || products.length === 0) {
        return res.status(400).json({ error: 'Por favor complete todos los campos del formulario y agregue al menos un producto al ticket.' });
    }

    try {
        const clientInsertResult = await client.execute({
            sql: 'INSERT INTO OrderTable (customerName, customerId, email, phoneNumber, time, totalPriceOrder) VALUES (?, ?, ?, ?, ?, ?)',
            args: [name, customerId, email, phoneNumber, time, totalPriceOrder ]
        });

        const result = await client.execute({
            sql: 'SELECT last_insert_rowid() AS orderId'
        });
        const orderId = result.rows[0].orderId;
        for (const { productId,productName, productQuantity, productPrice, totalPrice} of products) {
            await client.execute({
                
                sql: 'INSERT INTO OrderProduct (productId,orderId, productName, productQuantity, productPrice, totalPrice) VALUES (?, ?, ?, ?,?,?)',
                args: [productId,orderId, productName, productQuantity, productPrice,totalPrice]
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
            totalPriceOrder:order.totalPriceOrder
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
                totalPriceOrder:order.totalPriceOrder
            };
        }));

        res.status(200).json(ordersWithProducts);
    } catch (error) {
        console.error('Error al obtener todas las órdenes y sus productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});

/*Esto devolvera una lista con todas las ordenes, el cual cada orden seguira la siguiente estructura

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


// Nuevo endpoint para obtener la última orden
ventasRouter.get('/latestOrder', async (req, res) => {
    try {
        // Obtener la última orden
        const latestOrderResult = await client.execute({
            sql: 'SELECT * FROM OrderTable ORDER BY id DESC LIMIT 1'
        });

        if (latestOrderResult.rows.length === 0) {
            return res.status(404).json({ error: 'No hay órdenes disponibles.' });
        }

        const latestOrder = latestOrderResult.rows[0];

        // Obtener los productos asociados a la última orden
        const productsResult = await client.execute({
            sql: 'SELECT * FROM OrderProduct WHERE orderId = ?',
            args: [latestOrder.id]
        });

        const products = productsResult.rows;

        // Combinar la información de la última orden y los productos
        const latestOrderWithProducts = {
            orderId: latestOrder.id,
            customerName: latestOrder.customerName,
            customerId: latestOrder.customerId,
            email: latestOrder.email,
            phoneNumber: latestOrder.phoneNumber,
            status: latestOrder.status,
            time: latestOrder.time,
            products: products,
            totalPrice: latestOrder.totalPrice
        };

        res.status(200).json(latestOrderWithProducts);
    } catch (error) {
        console.error('Error al obtener la última orden y sus productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});




export default ventasRouter;
