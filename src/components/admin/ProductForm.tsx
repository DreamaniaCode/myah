'use client';

import { useState } from 'react';
import styles from './ProductForm.module.css';
import ImageUpload from './ImageUpload';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
    action: (formData: FormData) => Promise<unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    submitLabel: string;
}

export default function ProductForm({ action, initialData, submitLabel }: ProductFormProps) {
    const [imagePreview, setImagePreview] = useState(initialData?.image || '');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Append image from state if not present in input (though hidden input handles this, explicitly ensuring)
        if (!formData.get('image')) {
            formData.set('image', imagePreview);
        }

        try {
            await action(formData);
            toast.success('تمت إضافة المنتج بنجاح! 🚀');
            router.push('/admin/products');
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء إضافة المنتج 😢');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formGrid}>
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
