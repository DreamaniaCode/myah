'use client';

import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css'; // Reusing card styles 
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ product, quantity = 1 }: { product: any, quantity?: number }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        addToCart(product, quantity);
        router.push('/checkout');
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`${styles.addToCartBtn}`}
            style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#1a4d2e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1rem',
                fontSize: '1.1rem'
            }}
        >
            إضافة للسلة 🛒
        </button>
    );
}
