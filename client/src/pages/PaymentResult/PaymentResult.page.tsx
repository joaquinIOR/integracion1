import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonSpinner, IonText, IonButton, IonIcon } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export const PaymentResultPage: React.FC = () => {
    const query = useQuery();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = query.get('token_ws');

        if (!token) {
            // Maneja el caso donde el usuario cancela o hay un error antes de tiempo.
            // El token 'TBK_TOKEN' es enviado por Transbank cuando el pago es anulado.
            if (query.get('TBK_TOKEN')) {
                setError('Pago anulado por el usuario.');
            } else {
                setError('Token de transacción no encontrado.');
            }
            setLoading(false);
            return;
        }

        // Llama a tu backend para confirmar la transacción
        const commitTransaction = async () => {
            try {
                const response = await fetch('http://localhost:7000/api/webpay/commit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // El pago fue exitoso y confirmado en el backend
                    setPaymentSuccess(true);
                } else {
                    throw new Error(data.error || 'Error al confirmar el pago.');
                }
            } catch (e: any) {
                setError(e.message);
                setPaymentSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        commitTransaction();
    }, [query]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Resultado del Pago</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding ion-text-center">
                {loading ? (
                    <IonSpinner name="crescent" />
                ) : paymentSuccess ? (
                    <div>
                        <IonIcon icon={checkmarkCircle} color="success" style={{ fontSize: '64px' }} />
                        <h1>¡Pago Exitoso!</h1>
                        <p>Tu compra ha sido procesada correctamente.</p>
                        <IonButton routerLink="/home" expand="block">Volver al Inicio</IonButton>
                    </div>
                ) : (
                    <div>
                        <IonIcon icon={closeCircle} color="danger" style={{ fontSize: '64px' }} />
                        <h1>Error en el Pago</h1>
                        <p>{error || 'Ocurrió un problema al procesar tu pago.'}</p>
                        <IonButton routerLink="/cart" expand="block">Volver al Carrito</IonButton>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};