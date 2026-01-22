'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div
            className={styles.card}
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        >
            {product.isNew && <span className={styles.badge}>جديد</span>}
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className={styles.details}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price}>{product.price} درهم</div>
                <p className={styles.description}>{product.description}</p>
                <button
                    className={styles.addButton}
                    onClick={handleAdd}
                    style={{ backgroundColor: isAdded ? 'var(--secondary-color)' : '' }}
                >
                    {isAdded ? (
                        <>
                            <span>تمت الإضافة</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </>
                    ) : (
                        <>
                            <span>إضافة للسلة</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
