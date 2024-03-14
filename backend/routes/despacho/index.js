
import express from 'express';
import getOrderbyId from './service.js';

const distribucionRouter = express.Router();

// Obtener información de distribución por id de orden
distribucionRouter.get('/orden/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    try {
        
        const distribucionResult = getOrderbyId(req.params.orderId)

        if (distribucionResult.rows.length === 0) {
            return res.status(404).json({ error: 'La información de distribución para la orden especificada no fue encontrada.' });
        }

        const distribucion = distribucionResult.rows[0];

        res.status(200).send(distribucion)
    } catch (error) {
        console.error('Error al obtener la información de distribución:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});



export default distribucionRouter;
