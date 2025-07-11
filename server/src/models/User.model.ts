import { model, Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserProject } from '../interfaces/User.interface'; // 1. Importa la interfaz correcta

// --- INTERFAZ PARA EL MODELO DE MONGOOSE ---
// Creamos una nueva interfaz que extiende la que ya tienes (UserProject)
// y le añade las funcionalidades de Mongoose (Document) y nuestro método personalizado.
export interface IUserModel extends UserProject, Document {
    comparePassword(password: string): Promise<boolean>;
}

// --- ESQUEMA DE USUARIO COMPLETO ---
// Este esquema ahora coincide 100% con tu interfaz UserProject.
const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: { type: String, required: true },
        permissions: { type: Schema.Types.Mixed, default: {} }, // Usamos Mixed para el tipo 'any'
        roles: [{
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }],
        clients: [{
            type: Schema.Types.ObjectId,
            ref: 'Client'
        }],
        image: { type: String },
        state: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
        phone: { type: String },
        user_id: { type: Number },
        emailVerifiedAt: { type: Date }
    },
    {
        timestamps: true // Esto añade createdAt y updatedAt automáticamente
    }
);

// --- CÓDIGO DE ENCRIPTACIÓN Y COMPARACIÓN (SIN CAMBIOS) ---
userSchema.pre<IUserModel>('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// --- ASOCIAR LA INTERFAZ CORRECTA AL MODELO ---
const userModel = model<IUserModel>('User', userSchema);

export default userModel;
