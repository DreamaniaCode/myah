export interface Product {
    id: string;
    name: string;
    slug?: string | null;
    description: string;
    price: number;
    image: string;
    images?: string[];
    category: string;
    isNew?: boolean;
}
