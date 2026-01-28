'use client';

import { useState } from 'react';
import { getProduct, updateProduct } from '@/app/actions';
import { redirect } from 'next/navigation';
import styles from '../../../styles.module.css';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditProductForm({ product }: { product: any }) {
    const [imageUrl, setImageUrl] = useState(product.image);
    const handleUpdate = updateProduct.bind(null, product.id);

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>تعديل المنتج</h1>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '800px' }}>
                <form action={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Image Preview Section */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>صورة المنتج</label>
                        <input type="hidden" name="image" value={imageUrl} />
                        <ImageUpload
                            value={imageUrl}
                            onChange={(url) => setImageUrl(url)}
                            onRemove={() => setImageUrl('')}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>اسم المنتج</label>
                        <input
                            name="name"
                            defaultValue={product.name}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>السعر (درهم)</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            defaultValue={product.price}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>الفئة</label>
                        <select
                            name="category"
                            defaultValue={product.category}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        >
                            <option value="honey">عسل</option>
                            <option value="herbs">أعشاب</option>
                            <option value="oils">زيوت</option>
                        </select>
                    </div>


                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>صور إضافية (افصل بين الروابط بفاصلة ,)</label>
                        <input
                            name="images"
                            defaultValue={product.images?.join(', ')}
                            placeholder="/images/img1.png, /images/img2.png"
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>الوصف</label>
                        <textarea
                            name="description"
                            defaultValue={product.description}
                            required
                            rows={4}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: 'span 2' }}>
                        <input type="checkbox" name="isNew" defaultChecked={product.isNew} />
                        <span>منتج جديد</span>
                    </label>

                    <div style={{ display: 'flex', gap: '1rem', gridColumn: 'span 2' }}>
                        <button type="submit" className={`${styles.btn} ${styles.primary}`} style={{ flex: 1, padding: '1rem' }}>
                            💾 حفظ التغييرات
                        </button>
                        <a href="/admin/products" className={`${styles.btn}`} style={{ flex: 1, padding: '1rem', textAlign: 'center', background: '#6B7280', color: 'white', textDecoration: 'none' }}>
                            إلغاء
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
