import { Router } from 'express';
// Corregimos la importación para usar el objeto principal de Transbank
import Transbank from 'transbank-sdk';

const router = Router();

// Accedemos a las clases y objetos a través del objeto Transbank
const tx = new Transbank.WebpayPlus.Transaction(
    new Transbank.Options(
        Transbank.IntegrationCommerceCodes.WEBPAY_PLUS, 
        Transbank.IntegrationApiKeys.WEBPAY, 
        Transbank.Environment.Integration
    )
);

/**
 * RUTA 1: Iniciar la transacción
 */
router.post('/create', async (req, res) => {
    const { buyOrder, sessionId, amount } = req.body;
    const returnUrl = 'http://localhost:8100/payment-result';

    try {
        const createResponse = await tx.create(buyOrder, sessionId, amount, returnUrl);
        res.json(createResponse);
    } catch (error) {
        console.error("Error al crear la transacción en Webpay:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/**
 * RUTA 2: Confirmar la transacción
 */
router.post('/commit', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Falta el token de la transacción.' });
    }

    try {
        const commitResponse = await tx.commit(token);
        
        // AQUÍ ES DONDE ACTUALIZAS TU BASE DE DATOS
        console.log('Transacción confirmada:', commitResponse);

        res.json({ success: true, details: commitResponse });

    } catch (error) {
        console.error("Error al confirmar la transacción en Webpay:", error);
        res.status(500).json({ success: false, error: 'Error al confirmar el pago.' });
    }
});

export default router;