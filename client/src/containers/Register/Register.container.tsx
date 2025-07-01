import { IonCol, IonItem, IonLabel, IonInput, IonButton, IonContent, IonGrid, IonRow } from "@ionic/react";
import { useState } from "react";

export const RegisterContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            console.error("Las contraseñas no coinciden");
            return;
        }
        console.log('Registrando:', { email, password });
    }

    return (
    <IonContent>
        <IonGrid>
            <IonRow>
            <IonCol>

            </IonCol>
                <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="10" sizeXs="12">
                    <div style={{textAlign: 'center', marginBottom: '20px', marginTop: 10}}>
                                <img src='/public/images/images.png'></img>
                    </div>
                    <IonItem>
                        <IonLabel position='floating'>Nombre</IonLabel>
                            <IonInput
                                type="text"
                                value={name}
                                onIonChange={e => setName(e.detail.value!)}
                                required
                                 />
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>Apellido</IonLabel>
                            <IonInput
                                type="text"
                                value={surname}
                                onIonChange={e => setSurname(e.detail.value!)}
                                required
                                 />
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>Correo</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={e => setEmail(e.detail.value!)}
                                required
                                 />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Contraseña</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonChange={e => setPassword(e.detail.value!)}
                                required
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Confirmar Contraseña</IonLabel>
                            <IonInput
                                type="password"
                                value={confirmPassword}
                                onIonChange={e => setConfirmPassword(e.detail.value!)}
                                required
                        />
                    </IonItem>
                        <IonButton expand="block" className="ion-margin-top" onClick={handleRegister}>
                            Registrarse
                        </IonButton>
                    </IonCol>
                <IonCol>
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonContent>
    );
};