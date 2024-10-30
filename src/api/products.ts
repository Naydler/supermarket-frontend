

export interface Product {
    id: number;
    shopId: number; 
    name: string;
    ean: string; 
    price_of_buy: number; 
    price_of_sell: number; 
    stock_warning: number; 
    stock: number; 
    date: string; 
    image: string;
    ivaCategoryId: number;
    id_supplier: number;
}

const BASE_URL = 'http://127.0.0.1:8000/product';

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${BASE_URL}/getallproducts/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

