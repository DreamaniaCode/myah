import { Product } from '@/types';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className={styles.grid}>
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
}
