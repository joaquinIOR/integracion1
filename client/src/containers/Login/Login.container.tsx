import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRow, IonInput, IonButton } from "@ionic/react"
import { useState } from "react";

export const LoginContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
            console.log('Login:', email, password);
    }

    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol>
                    </IonCol>
                    <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="10" sizeXs="12">
                        {/*LOGO*/}

                        <div style={{textAlign: 'center', marginBottom: '20px', marginTop: 100}}>
                            <img src='./images/simotec.webp'></img>
                        </div>

                        {/* Formulario */}

                        <IonItem>
                            <IonLabel position = 'floating'>Correo</IonLabel>
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

                            <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
                              iniciar sesion
                            </IonButton>

                    </IonCol>
                    <IonCol>
                        
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}