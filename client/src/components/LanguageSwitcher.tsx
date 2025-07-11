import React from 'react';
import { useTranslation } from 'react-i18next';
import { IonButton, IonIcon } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <IonButton onClick={changeLanguage} fill="clear" color="light" title={`Change to ${i18n.language === 'es' ? 'English' : 'Español'}`}>
        <IonIcon slot="icon-only" icon={globeOutline} />
        <span style={{ marginLeft: '5px', textTransform: 'uppercase' }}>{i18n.language}</span>
    </IonButton>
  );
};
