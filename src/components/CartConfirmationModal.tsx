'use client';

import { useRouter } from 'next/navigation';

interface CartConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function CartConfirmationModal({ isOpen, onClose, productName }: CartConfirmationModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                maxWidth: '90%',
                width: '400px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>تمت الإضافة بنجاح</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    تمت إضافة "{productName}" إلى سلة مشترياتك.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <button
                        onClick={() => router.push('/cart')}
                        style={{
                            background: '#1a4d2e',
                            color: 'white',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        إتمام الشراء (الذهاب للسلة)
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'white',
                            color: '#4B5563',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        متابعة التسوق
                    </button>
                </div>
            </div>
        </div>
    );
}
