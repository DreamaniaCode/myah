export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'honey' | 'herbs' | 'oils';
    isNew?: boolean;
}
