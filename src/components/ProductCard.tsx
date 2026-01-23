'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import styles from './ProductCard.module.css';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        addToCart(product);

        setTimeout(() => {
            setIsAdding(false);
        }, 600);
    };

    return (
        <div
            className={styles.card}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {product.isNew && <span className={styles.badge}>جديد</span>}

            <Link href={`/products/${product.id}`} className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    style={{ objectFit: 'cover' }}
                />
            </Link>

            <div className={styles.content}>
                <Link href={`/products/${product.id}`}>
                    <h3 className={styles.name}>{product.name}</h3>
                </Link>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        {product.price}
                        <span className={styles.currency}>درهم</span>
                    </div>

                    <div className={styles.actions}>
                        <button
                            onClick={handleAddToCart}
                            className={`${styles.btn} ${styles.addToCart}`}
                            disabled={isAdding}
                        >
                            {isAdding ? '✓' : '🛒'} {isAdding ? 'تمت الإضافة' : 'أضف للسلة'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
