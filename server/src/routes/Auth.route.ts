import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { jwtSecret } from '../configs/env';

const router = Router();

// La ruta de registro no necesita cambios
router.post('/register', async (req, res) => {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está en uso.' });
        }
        const newUser = new User({ name, lastName, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
});

// --- RUTA DE LOGIN (MODIFICADA) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, provee email y contraseña.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
            expiresIn: '24h'
        });

        // --- CAMBIO CLAVE AQUÍ ---
        // Ahora devolvemos más datos del usuario en la respuesta.
        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: { 
                id: user._id, 
                email: user.email,
                name: user.name,
                lastName: user.lastName
            }
        });
        // -------------------------

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
});

export default router;
