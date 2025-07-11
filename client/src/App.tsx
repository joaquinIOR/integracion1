import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { LoginPage } from './pages/Login/Login.page';
import Home from './pages/Home/Home.page';
import FormulariosPage from './pages/Formularios/Formularios.page';
import RubrosPage from './pages/Rubros/Rubro.page';
import UserAdministrationPage from './pages/UserAdministrations/userAdministration.page';
import ResultadosPage from './pages/Resultados/Resultado.page';
import { ItemProvider } from './contexts/Item.context';
import { RegisterPage } from './pages/Register/Register.page';
import { ShoppingCartPage } from './pages/ShoppingCart/ShoppingCart.page';
import { CartProvider } from './contexts/Cart.context';
import { PaymentResultPage } from './pages/PaymentResult/PaymentResult.page';
import { AuthProvider } from './contexts/Auth.context';

setupIonicReact();

const Service = () => {
  return (
    <IonRouterOutlet>
        <Route exact path="/login">
        <LoginPage />
        </Route>
        <Route exact path="/home">
          <Home username="Joaquín" />
        </Route>
         <Route path="/payment-result" component={PaymentResultPage} />
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/Formularios">
          <FormulariosPage />
        </Route>
        <Route exact path="/cart">
          <ShoppingCartPage />
        </Route>
        <Route exact path="/Rubros">
          <RubrosPage />
        </Route>
        <Route exact path="/admUsuarios">
          <UserAdministrationPage/>
        </Route>
        <Route exact path="/resultados">
          <ResultadosPage/>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
  )
}

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <AuthProvider> {/* <-- ENVUELVE CON AUTH */}
                <ItemProvider>
                    <CartProvider>
                        <Service />
                    </CartProvider>
                </ItemProvider>
            </AuthProvider>
        </IonReactRouter>
    </IonApp>
);

export default App;