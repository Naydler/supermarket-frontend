

export interface Company {
    id: number;
    name: string;
    idclient: number;
}

export interface OptionCompany {
    value: number;
    label: string;
}
const BASE_URL = 'http://127.0.0.1:8000/company';

export const getAllCompanyOptions = async (): Promise<OptionCompany[]> => {
    try {
        const response = await fetch(`${BASE_URL}/create/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Company[] = await response.json();

        console.log('data:', data);

        const options = data.map(Company => ({
            label: Company.name,
            value: Company.id,
        }));
        return options;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
