'use client';

import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css'; // Reusing card styles for button consistency or create new

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        // Optional: Add toast notification here
        alert('تمت إضافة المنتج للسلة');
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
