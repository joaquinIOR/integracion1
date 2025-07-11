import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    IonInput, 
    IonButton, 
    IonItem, 
    IonLabel, 
    IonSpinner,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonText,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import { useAuth } from '../../contexts/Auth.context';

export const LoginContainer: React.FC = () => {
    const { t } = useTranslation();
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
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
                            src="/assets/img/logo.png" 
                            alt="Logo de la Empresa" 
                            style={{ maxWidth: '200px', margin: '20px auto' }}
                        />
                        <IonCardHeader>
                            <IonCardTitle className="ion-text-center" style={{ letterSpacing: '1.5px' }}>
                                {t('loginTitle')}
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form onSubmit={handleLogin} noValidate>
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel position="floating">{t('emailLabel')}</IonLabel>
                                    <IonInput 
                                        type="email" 
                                        value={email} 
                                        onIonChange={e => setEmail(e.detail.value!)} 
                                        required 
                                    />
                                </IonItem>
                                <IonItem style={{ marginBottom: '20px', paddingTop: '10px' }}>
                                    <IonLabel position="floating">{t('passwordLabel')}</IonLabel>
                                    <IonInput 
                                        type="password" 
                                        value={password} 
                                        onIonChange={e => setPassword(e.detail.value!)} 
                                        required 
                                    />
                                </IonItem>
                                
                                {error && <IonText color="danger"><p className="ion-text-center ion-padding-top">{error}</p></IonText>}
                                
                                <IonButton className="ion-margin-top" expand="block" type="submit" disabled={isLoading}>
                                    {isLoading ? <IonSpinner name="crescent" /> : t('loginButton')}
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};