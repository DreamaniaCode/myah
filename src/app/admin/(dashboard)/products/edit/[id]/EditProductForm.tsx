'use client';

import { useState } from 'react';
import { updateProduct } from '@/app/actions';
import styles from '../../../styles.module.css';
import ImageUpload from '@/components/admin/ImageUpload';
import GalleryUpload from '@/components/admin/GalleryUpload';
import { createSlug, sanitizeSlug } from '@/lib/slugify';
import { toast } from 'react-hot-toast';
import { Product } from '@/types';

export default function EditProductForm({ product }: { product: Product }) {
    const [name, setName] = useState(product.name || '');
    const [slug, setSlug] = useState(product.slug || createSlug(product.name));
    const [isCustomSlug, setIsCustomSlug] = useState(Boolean(product.slug));
    const [imageUrl, setImageUrl] = useState(product.image || '');
    const [galleryImages, setGalleryImages] = useState<string[]>(product.images || []);
    const handleUpdate = updateProduct.bind(null, product.id);

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

        // Ensure image, images, slug are sent
        formData.set('image', imageUrl);
        formData.set('images', galleryImages.join(','));
        formData.set('slug', slug || createSlug(name));

        try {
            await handleUpdate(formData);
            toast.success('تم تحديث المنتج بنجاح! ✅');
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء التحديث ❌');
        }
    };

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>تعديل المنتج</h1>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Image Preview Section */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>صورة المنتج الرئيسية</label>
                        <input type="hidden" name="image" value={imageUrl} />
                        <ImageUpload
                            value={imageUrl}
                            onChange={(url) => {
                                setImageUrl(url);
                                if (!galleryImages.includes(url)) {
                                    setGalleryImages([url, ...galleryImages]);
                                }
                            }}
                            onRemove={() => setImageUrl('')}
                        />
                    </div>

                    {/* Gallery Section */}
                    <div style={{ gridColumn: 'span 2', padding: '1.25rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                        <input type="hidden" name="images" value={galleryImages.join(',')} />
                        <GalleryUpload
                            images={galleryImages}
                            onChange={(imgs) => setGalleryImages(imgs)}
                            mainImage={imageUrl}
                            onSetMainImage={(url) => setImageUrl(url)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>اسم المنتج</label>
                        <input
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600 }}>رابط المنتج المخصص (Slug)</label>
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
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                توليد تلقائي
                            </button>
                        </div>
                        <input
                            name="slug"
                            value={slug}
                            onChange={handleSlugChange}
                            placeholder="curcuma-natura"
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                            dir="ltr"
                        />
                        <p style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', direction: 'ltr', textAlign: 'left' }}>
                            https://herbsmyah.com/products/{slug || '...'}
                        </p>
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
                            <option value="cosmetics">تجميل</option>
                            <option value="other">أخرى</option>
                        </select>
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
