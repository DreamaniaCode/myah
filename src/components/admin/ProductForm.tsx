'use client';

import { useState } from 'react';
import styles from './ProductForm.module.css';
import ImageUpload from './ImageUpload';
import GalleryUpload from './GalleryUpload';
import { createSlug, sanitizeSlug } from '@/lib/slugify';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
    action: (formData: FormData) => Promise<unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    submitLabel: string;
}

export default function ProductForm({ action, initialData, submitLabel }: ProductFormProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [slug, setSlug] = useState(initialData?.slug || (initialData?.name ? createSlug(initialData.name) : ''));
    const [isCustomSlug, setIsCustomSlug] = useState(Boolean(initialData?.slug));
    const [imagePreview, setImagePreview] = useState(initialData?.image || '');
    const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.images || []);
    const router = useRouter();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (!isCustomSlug) {
            setSlug(createSlug(newName));
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCustomSlug(true);
        setSlug(sanitizeSlug(e.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Append image from state if not present in input
        if (!formData.get('image')) {
            formData.set('image', imagePreview);
        }

        // Set images from gallery state
        formData.set('images', galleryImages.join(','));

        // Ensure slug is set
        formData.set('slug', slug || createSlug(name));

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
                            value={name}
                            onChange={handleNameChange}
                            placeholder="مثال: عسل الدغموس"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <label>رابط المنتج المخصص (Custom Slug / URL)</label>
                            <button
                                type="button"
                                onClick={() => {
                                    const generated = createSlug(name);
                                    setSlug(generated);
                                    setIsCustomSlug(false);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#059669',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                توليد تلقائي من الاسم
                            </button>
                        </div>
                        <input
                            name="slug"
                            value={slug}
                            onChange={handleSlugChange}
                            placeholder="مثال: asal-daghmous"
                            className={styles.input}
                            dir="ltr"
                        />
                        <p style={{ fontSize: '0.8rem', color: '#059669', marginTop: '0.35rem', direction: 'ltr', textAlign: 'left' }}>
                            🔗 الرابط: <strong>https://herbsmyah.com/products/{slug || '...'}</strong>
                        </p>
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
                    <h3 className={styles.cardTitle}>الصور والمعرض</h3>
                    <div className={styles.formGroup}>
                        <label>الصورة الرئيسية للمنتج</label>
                        {/* Hidden input to allow form submission to pick up the value */}
                        <input type="hidden" name="image" value={imagePreview} />
                        <ImageUpload
                            value={imagePreview}
                            onChange={(url) => {
                                setImagePreview(url);
                                if (!galleryImages.includes(url)) {
                                    setGalleryImages([url, ...galleryImages]);
                                }
                            }}
                            onRemove={() => setImagePreview('')}
                        />
                    </div>

                    <div className={styles.formGroup} style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E7EB' }}>
                        <input type="hidden" name="images" value={galleryImages.join(',')} />
                        <GalleryUpload
                            images={galleryImages}
                            onChange={(imgs) => setGalleryImages(imgs)}
                            mainImage={imagePreview}
                            onSetMainImage={(url) => setImagePreview(url)}
                        />
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
