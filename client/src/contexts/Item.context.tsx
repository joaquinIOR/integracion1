import React, {
    createContext,
    useEffect,
    ReactNode,
    useContext,
    useState,
    useMemo,
} from 'react';
import { getItems } from '../routes/Items.route';

// (La interfaz Item no cambia)
export interface Item {
    _id: string;
    codeProduct: string;
    brand: string;
    code: string;
    name: string;
    price: { date: Date; value: number }[];
    img?: string;
    stock: number;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// --- CAMBIO 1: AÑADE ESTAS PROPIEDADES A LA INTERFAZ ---
interface ItemContextValue {
    allItems: Item[];
    filteredItems: Item[];
    availableBrands: string[];
    selectedBrands: string[];
    toggleBrandFilter: (brand: string) => void;
    searchTerm: string; // <-- AÑADE ESTA LÍNEA
    setSearchFilter: (term: string) => void; // <-- AÑADE ESTA LÍNEA
}

const ItemContext = createContext<ItemContextValue | undefined>(undefined);

export const useItem = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('useItem must be used within an ItemProvider');
    }
    return context;
};

interface ItemProviderProps {
    children: ReactNode;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    // --- CAMBIO 2: AÑADE EL ESTADO PARA EL TÉRMINO DE BÚSQUEDA ---
    const [searchTerm, setSearchTerm] = useState(''); // <-- AÑADE ESTA LÍNEA

    useEffect(() => {
        const readItems = async () => {
            try {
                const response = await getItems();
                setAllItems(response);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        readItems();
    }, []);

    const toggleBrandFilter = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    // --- CAMBIO 3: AÑADE LA FUNCIÓN PARA ACTUALIZAR LA BÚSQUEDA ---
    const setSearchFilter = (term: string) => {
        setSearchTerm(term);
    };

    const availableBrands = useMemo(() => {
        const brands = allItems.map(item => item.brand);
        return [...new Set(brands)];
    }, [allItems]);

    // --- CAMBIO 4: ACTUALIZA LA LÓGICA DE FILTRADO ---
    const filteredItems = useMemo(() => {
        let items = allItems;

        // 1. Aplicar filtro por marcas (si hay alguna seleccionada)
        if (selectedBrands.length > 0) {
            items = items.filter(item => selectedBrands.includes(item.brand));
        }

        // 2. Aplicar filtro por nombre sobre el resultado anterior
        if (searchTerm.trim() !== '') {
            items = items.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return items;
    }, [allItems, selectedBrands, searchTerm]); // <-- AÑADE searchTerm a las dependencias

    // --- CAMBIO 5: AÑADE LAS NUEVAS PROPIEDADES AL VALOR DEL CONTEXTO ---
    const value: ItemContextValue = {
        allItems,
        filteredItems,
        availableBrands,
        selectedBrands,
        toggleBrandFilter,
        searchTerm, // <-- AÑADE ESTA LÍNEA
        setSearchFilter, // <-- AÑADE ESTA LÍNEA
    };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
};