import React, { useMemo } from 'react';
import { useItem } from '../contexts/Item.context';
import { ItemCard } from './ItemCard';

// Importa los componentes de Swiper que necesitas
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Función para barajar un array (algoritmo Fisher-Yates)
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


export const ProductCarousel: React.FC = () => {
    const { allItems } = useItem();

    // Usamos useMemo para barajar los productos solo una vez
    // y evitar que el orden cambie en cada renderizado.
    const randomProducts = useMemo(() => {
        if (allItems.length === 0) {
            return [];
        }
        // Tomamos hasta 10 productos al azar para el carrusel
        return shuffleArray(allItems).slice(0, 10);
    }, [allItems]);

    if (randomProducts.length === 0) {
        return null; // No mostrar nada si no hay productos
    }

    return (
        <div style={{ marginBottom: '2rem' }}>
            <Swiper
                // Módulos que usaremos: Autoplay y Pagination
                modules={[Autoplay, Pagination]}
                // Hacer el carrusel infinito
                loop={true}
                // Configuración del autoplay
                autoplay={{
                    delay: 2500, // Tiempo entre cada slide en ms
                    disableOnInteraction: false, // No detener al interactuar
                }}
                // Muestra los puntos de paginación
                pagination={{ clickable: true }}
                // Espacio entre cada tarjeta
                spaceBetween={20}
                // Cuántos slides mostrar según el tamaño de la pantalla
                slidesPerView={1.2}
                breakpoints={{
                    // mayor a 576px
                    576: {
                        slidesPerView: 2.5,
                    },
                    // mayor a 768px
                    768: {
                        slidesPerView: 3.5,
                    },
                    // mayor a 992px
                    992: {
                        slidesPerView: 4.5,
                    },
                }}
            >
                {randomProducts.map((item, index) => (
                    <SwiperSlide key={item._id || index}>
                        <ItemCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};