// src/pages/Home/Home.page.tsx (Modificar)
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons,
    IonMenuButton, IonIcon, IonButton, IonMenu, IonGrid, IonRow, IonCol
} from '@ionic/react';
import { person, cart, logOutOutline } from 'ionicons/icons';
import { useAuth } from '../../contexts/Auth.context';
import { useItem } from '../../contexts/Item.context';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { FilterMenu } from '../../components/FilterMenu';
import { ProductCarousel } from '../../components/ProductCarousel';
import { ItemCard } from '../../components/ItemCard';

const AppStructure: React.FC = () => {
    // 1. Llama a los hooks una sola vez al principio
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuth();
    const { filteredItems } = useItem();

    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle>{t('filtersTitle')}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <FilterMenu />
                </IonContent>
            </IonMenu>

            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Ferremax</IonTitle>
                        <IonButtons slot="end">
                            <LanguageSwitcher />
                            {isAuthenticated ? (
                                <IonButton onClick={logout} title={t('logoutButton')}>
                                    <IonIcon slot="icon-only" icon={logOutOutline} />
                                </IonButton>
                            ) : (
                                <IonButton routerLink="/login" title={t('loginTitle')}>
                                    <IonIcon slot="icon-only" icon={person} />
                                </IonButton>
                            )}
                            <IonButton routerLink="/cart" title={t('shoppingCartTitle')}>
                                <IonIcon slot="icon-only" icon={cart} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen className="ion-padding">
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Ferremax</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    {isAuthenticated && user ? (
                        <h2 className="ion-padding-start">{t('welcomeMessage', { name: user.name })}</h2>
                    ) : (
                        <h2 className="ion-padding-start">{t('welcomeGuest')}</h2>
                    )}
                    
                    <ProductCarousel />
                    
                    <IonGrid>
                        <IonRow>
                            {filteredItems.map((item) => (
                                <IonCol size="12" size-md="6" size-lg="4" key={item._id}>
                                    <ItemCard item={item} />
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default AppStructure;
    