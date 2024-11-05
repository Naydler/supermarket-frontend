
export interface Offer {
    id: number;
    startDate: string;
    endDate: string;
    discount: number;
    idProduct: number;
    idEmployee: number;
    idShop: number;
    working: boolean;
}

const BASE_URL = 'http://127.0.0.1:8000/offer';

export const getOffer = async (id: number): Promise<Offer | null> => {
    try {
        const response = await fetch(`${BASE_URL}/api/last/${id}`);
        if (!response.ok) {
            return null; 
        }
        const data: Offer = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; 
    }
};
