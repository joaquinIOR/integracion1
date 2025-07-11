import React from 'react';
import { 
    IonList, 
    IonListHeader, 
    IonItem, 
    IonLabel, 
    IonCheckbox,
    IonSearchbar 
} from '@ionic/react';
import { useItem } from '../contexts/Item.context';

export const FilterMenu: React.FC = () => {
    // 2. OBTÉN LAS NUEVAS PROPIEDADES DEL CONTEXTO
    const { 
        availableBrands, 
        selectedBrands, 
        toggleBrandFilter,
        searchTerm,
        setSearchFilter
    } = useItem();

    return (
        // Usamos React.Fragment (<>) para agrupar los elementos
        <>
            {/* 3. AÑADE LA BARRA DE BÚSQUEDA */}
            <IonList>
                <IonListHeader>
                    <IonLabel>Buscar por Nombre</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonSearchbar
                        value={searchTerm}
                        onIonInput={(e) => setSearchFilter(e.detail.value!)}
                        placeholder="Ej: Zapatillas"
                        debounce={300} // Espera 300ms para actualizar
                    ></IonSearchbar>
                </IonItem>
            </IonList>

            {/* El filtro por marca no cambia */}
            <IonList>
                <IonListHeader>
                    <IonLabel>Filtrar por Marca</IonLabel>
                </IonListHeader>
                {availableBrands.map(brand => (
                    <IonItem key={brand}>
                        <IonLabel>{brand}</IonLabel>
                        <IonCheckbox
                            slot="end"
                            value={brand}
                            checked={selectedBrands.includes(brand)}
                            onIonChange={() => toggleBrandFilter(brand)}
                        />
                    </IonItem>
                ))}
            </IonList>
        </>
    );
};