// src/main.tsx (Modificar)
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n'; // Importa la configuración de i18next

// Estilos de Swiper (si los tienes)
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { IonSpinner } from '@ionic/react';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Suspense fallback={<IonSpinner />}>
      <App />
    </Suspense>
  </React.StrictMode>
);