export interface Supplier {
    id: number;
    name: string;
    web_link: string; 
    address: string; 
    email: string; 
    phone: number; 
    nif: number; 
    }

export interface OptionSupplier {
    value: number;
    label: string;
}


const BASE_URL = 'http://127.0.0.1:8000/supplier';

export const getAllSuppliers = async (): Promise<OptionSupplier[]> => {
    try {
        const response = await fetch(`${BASE_URL}/create/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Supplier[] = await response.json();

        const options = data.map(supplier => ({
            label: supplier.name,
            value: supplier.id,
        }));

        return options;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};