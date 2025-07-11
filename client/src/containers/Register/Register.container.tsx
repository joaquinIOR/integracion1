import React, { useState } from 'react';
import { 
    IonInput, IonButton, IonItem, IonLabel, IonSpinner, IonText,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg,
    IonGrid, IonRow, IonCol
} from '@ionic/react';
import { useAuth } from '../../contexts/Auth.context';

export const RegisterContainer: React.FC = () => {
    const { register, isLoading } = useAuth(); 
    
    // 1. AÑADE ESTADOS PARA NOMBRE Y APELLIDO
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            // 2. ENVÍA TODOS LOS DATOS EN EL REGISTRO
            await register({ name, lastName, email, password });
            setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol size="12" size-md="8" size-lg="6" size-xl="4">
                    <IonCard>
                        <IonImg 
                            src="/public/images/images.png" 
                            alt="Logo de la Empresa" 
                            style={{ maxWidth: '200px', margin: '20px auto' }}
                        />
                        <IonCardHeader>
                            <IonCardTitle className="ion-text-center">Crear Cuenta</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form onSubmit={handleRegister} noValidate>
                                {/* 3. AÑADE LOS CAMPOS AL FORMULARIO */}
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel style = {{ marginBottom: '10px'}}position="floating">Nombre</IonLabel>
                                    <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)} required />
                                </IonItem>
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel style = {{ marginBottom: '10px'}}position="floating">Apellido</IonLabel>
                                    <IonInput type="text" value={lastName} onIonChange={e => setLastName(e.detail.value!)} required />
                                </IonItem>
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel style = {{ marginBottom: '10px'}}position="floating">Email</IonLabel>
                                    <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
                                </IonItem>
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel style = {{ marginBottom: '10px'}}position="floating">Contraseña</IonLabel>
                                    <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required />
                                </IonItem>
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel style = {{ marginBottom: '10px'}}position="floating">Confirmar Contraseña</IonLabel>
                                    <IonInput type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} required />
                                </IonItem>
                                
                                {error && <IonText color="danger"><p className="ion-text-center ion-padding-top">{error}</p></IonText>}
                                {success && <IonText color="success"><p className="ion-text-center ion-padding-top">{success}</p></IonText>}

                                <IonButton className="ion-margin-top" expand="block" type="submit" disabled={isLoading}>
                                    {isLoading ? <IonSpinner name="crescent" /> : 'Registrarse'}
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};