import React from 'react';
import { useCart } from '../../contexts/Cart.context';
import {
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonButton, // <-- 1. Importa IonButton
    IonText     // <-- 2. Importa IonText para mostrar el total
} from '@ionic/react';
import { trash, card } from 'ionicons/icons'; // <-- 3. Importa el ícono de 'card'
import { redirectToWebpay } from '../../utils/webpay'; // <-- 4. Importa la función de utilidad

export const ShoppingCartContainer: React.FC = () => {
    const { cartItems, removeFromCart } = useCart();

    // --- 5. AÑADE LA LÓGICA PARA CALCULAR EL TOTAL ---
    const calculateTotal = () => {
        if (!cartItems || cartItems.length === 0) {
            return 0;
        }
        return cartItems.reduce((total, item) => {
            // Asegúrate de que el item y el precio existen
            const price = item?.price?.[item.price.length - 1]?.value ?? 0;
            return total + price;
        }, 0);
    };

    // --- 6. AÑADE LA FUNCIÓN PARA MANEJAR EL PAGO ---
    const handlePayment = async () => {
        const total = calculateTotal();
        if (total <= 0) {
            alert("No puedes pagar un carrito vacío.");
            return;
        }

        // Crea los datos para la transacción
        const order = {
            buyOrder: `ORDEN-${Date.now()}`,      // Genera un ID de compra único
            sessionId: `SESION-${Date.now()}`,    // Genera un ID de sesión único
            amount: Math.round(total)             // El monto debe ser un entero
        };

        try {
            // Llama a tu backend para iniciar la transacción en Webpay
            const response = await fetch('http://localhost:7000/api/webpay/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                 throw new Error(`El servidor respondió con un error: ${response.status}`);
            }

            const data = await response.json();

            // Si el backend responde con la URL y el token, redirige al usuario
            if (data.url && data.token) {
                redirectToWebpay(data.url, data.token);
            } else {
                throw new Error("La respuesta del servidor no incluyó los datos de Webpay.");
            }

        } catch (error) {
            console.error("Error al iniciar el proceso de pago:", error);
            alert("Hubo un problema al intentar conectar con el servicio de pago. Por favor, intenta de nuevo más tarde.");
        }
    };

    const totalAmount = calculateTotal();

    return (
        <div>
            <h2>Items en tu carrito:</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <IonList>
                        {cartItems.map((item, index) => (
                            <IonItemSliding key={index}>
                                <IonItem>
                                    <IonLabel>
                                        <h2>{item.name}</h2>
                                        <p>Precio: ${item.price ? item.price[item.price.length - 1].value : 0}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" onClick={() => removeFromCart(index)}>
                                        <IonIcon slot="icon-only" icon={trash} />
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                    </IonList>
                    
                    {/* --- 7. MUESTRA EL TOTAL Y EL BOTÓN DE PAGO --- */}
                    <div className="ion-padding-top ion-text-right">
                        <IonText>
                            <h3>Total: ${totalAmount}</h3>
                        </IonText>
                    </div>

                    <IonButton expand="full" onClick={handlePayment} disabled={totalAmount <= 0}>
                        <IonIcon slot="start" icon={card} />
                        Pagar con Webpay
                    </IonButton>
                </>
            )}
        </div>
    );
};