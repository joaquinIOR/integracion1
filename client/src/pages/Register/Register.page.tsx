import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow } from "@ionic/react";
import { RegisterContainer } from "../../containers/Register/Register.container";

export const RegisterPage = () => {
    return (
        <IonPage>
            <IonContent>
                {/* Este Grid se encargará de centrar el contenido */}
                <IonGrid style={{ height: "100%" }}>
                    <IonRow
                        className="ion-justify-content-center ion-align-items-center"
                        style={{ height: "100%" }}
                    >
                        {/* El contenedor ahora se inserta dentro de la fila centrada */}
                        <RegisterContainer />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
