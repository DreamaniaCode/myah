'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductForm.module.css';
import ImageUpload from './ImageUpload';

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
                        <label>صورة المنتج</label>
                        {/* Hidden input to allow form submission to pick up the value */}
                        <input type="hidden" name="image" value={imagePreview} />
                        <ImageUpload
                            value={imagePreview}
                            onChange={(url) => setImagePreview(url)}
                            onRemove={() => setImagePreview('')}
                        />
                    </div>

                    <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                        <label>صور إضافية (اختياري)</label>
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
