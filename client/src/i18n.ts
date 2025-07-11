// src/i18n.ts (Archivo Nuevo)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Carga traducciones desde una API (en nuestro caso, los archivos JSON)
  .use(LanguageDetector) // Detecta el idioma del usuario
  .use(initReactI18next) // Pasa i18n a react-i18next
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es', // Idioma por defecto si el del usuario no está disponible
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Ruta a tus archivos de traducción
    },
    react: {
      useSuspense: true, // Usa Suspense de React para cargar las traducciones
    },
  });
export default i18n;