'use client';

import { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';

interface ProductActionsProps {
    product: any;
    price: number;
}

export default function ProductActions({ product, price }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem', padding: '1.5rem', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#374151' }}>الكمية:</span>
                <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={50} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                <span style={{ fontWeight: 600, color: '#374151' }}>المجموع:</span>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#059669' }}>
                    {(price * quantity).toFixed(2)} درهم
                </span>
            </div>

            <AddToCartButton product={product} quantity={quantity} />
        </div>
    );
}
