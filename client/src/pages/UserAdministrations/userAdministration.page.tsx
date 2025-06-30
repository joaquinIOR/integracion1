// 1. Importa IonButtons y IonBackButton
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';

const UserAdministrationPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          {/* 2. Añade el contenedor de botones al inicio de la barra */}
          <IonButtons slot="start">
            {/* 3. Inserta el botón de "volver" con una ruta por defecto */}
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Administrador de Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Administracion de Usuarios</h2>
        {/* Aquí puedes agregar la lógica y componentes para mostrar y gestionar los formularios */}
      </IonContent>
    </IonPage>
  );
};

export default UserAdministrationPage;