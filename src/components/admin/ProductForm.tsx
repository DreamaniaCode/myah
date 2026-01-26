'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductForm.module.css';

interface ProductFormProps {
    action: (formData: FormData) => Promise<any>;
    initialData?: any;
    submitLabel: string;
}

export default function ProductForm({ action, initialData, submitLabel }: ProductFormProps) {
    const [imagePreview, setImagePreview] = useState(initialData?.image || '');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImagePreview(e.target.value);
    };

    return (
        <form action={action} className={styles.formGrid}>
            <div className={styles.mainColumn}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>معلومات المنتج</h3>

                    <div className={styles.formGroup}>
                        <label>اسم المنتج</label>
                        <input
                            name="name"
                            defaultValue={initialData?.name}
                            placeholder="مثال: عسل الدغموس"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>الوصف</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description}
                            placeholder="وصف تفصيلي للمنتج..."
                            required
                            className={styles.textarea}
                            rows={6}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>الصور</h3>
                    <div className={styles.formGroup}>
                        <label>رابط الصورة الرئيسية</label>
                        <input
                            name="image"
                            defaultValue={initialData?.image}
                            onChange={handleImageChange}
                            placeholder="https://..."
                            required
                            className={styles.input}
                            dir="ltr"
                        />
                    </div>

                    {imagePreview && (
                        <div style={{ marginTop: '1rem', position: 'relative', height: '200px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    )}

                    <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                        <label>صور إضافية (اختياري)</label>
                        <input
                            name="images"
                            defaultValue={initialData?.images?.join(',')}
                            placeholder="رابط1, رابط2, رابط3"
                            className={styles.input}
                            dir="ltr"
                        />
                        <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.25rem' }}>افصل بين الروابط بفاصلة (,)</p>
                    </div>
                </div>
            </div>

            <div className={styles.sideColumn}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>التسعير</h3>
                    <div className={styles.formGroup}>
                        <label>السعر (درهم)</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            defaultValue={initialData?.price}
                            placeholder="0.00"
                            required
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>التنظيم</h3>

                    <div className={styles.formGroup}>
                        <label>الفئة</label>
                        <select
                            name="category"
                            defaultValue={initialData?.category || ''}
                            required
                            className={styles.select}
                        >
                            <option value="" disabled>اختر فئة</option>
                            <option value="honey">عسل (Honey)</option>
                            <option value="herbs">أعشاب (Herbs)</option>
                            <option value="oils">زيوت (Oils)</option>
                            <option value="cosmetics">تجميل (Cosmetics)</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isNew"
                                defaultChecked={initialData?.isNew}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span>منتج جديد</span>
                        </label>
                    </div>
                </div>

                <div className={styles.card}>
                    <button type="submit" className={styles.submitBtn}>
                        {submitLabel}
                    </button>
                </div>
            </div>
        </form>
    );
}
