

export interface ivaCategory {
    id: number;
    name: string;
    percentage: string;
}

export interface OptionivaCategory {
    value: number;
    label: string;
}
const BASE_URL = 'http://127.0.0.1:8000/ivaCategory';

export const getAllIvaCategoryOptions = async (): Promise<OptionivaCategory[]> => {
    try {
        const response = await fetch(`${BASE_URL}/create/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ivaCategory[] = await response.json();

        const options = data.map(ivaCategory => ({
            label: ivaCategory.name,
            value: ivaCategory.id,
        }));
        return options;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
