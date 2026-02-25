'use client';

import { useState } from 'react';
import styles from './ProductForm.module.css'; // Reusing similar styling
import ImageUpload from './ImageUpload';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';

interface BlogPostFormProps {
    action: (formData: FormData) => Promise<any>;
    initialData?: any;
    categories: any[];
    submitLabel: string;
}

export default function BlogPostForm({ action, initialData, categories, submitLabel }: BlogPostFormProps) {
    const [imagePreview, setImagePreview] = useState(initialData?.featuredImage || '');
    const [content, setContent] = useState(initialData?.content || '');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (!formData.get('featuredImage')) {
            formData.set('featuredImage', imagePreview);
        }

        formData.set('content', content);

        try {
            await action(formData);
            toast.success('تم الحفظ بنجاح! 🚀');
            router.push('/admin/blog');
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء الحفظ 😢');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.mainColumn}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>معلومات المقال</h3>

                    <div className={styles.formGroup}>
                        <label>عنوان المقال</label>
                        <input
                            name="title"
                            defaultValue={initialData?.title}
                            placeholder="مثال: فوائد عسل الدغموس"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>الرابط (Slug)</label>
                        <input
                            name="slug"
                            defaultValue={initialData?.slug}
                            placeholder="مثال: benefits-of-honey"
                            required
                            className={styles.input}
                            dir="ltr"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>نبذة (Excerpt)</label>
                        <textarea
                            name="excerpt"
                            defaultValue={initialData?.excerpt}
                            placeholder="وصف مختصر للمقال..."
                            className={styles.textarea}
                            rows={3}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>المحتوى</h3>
                    <div className={styles.formGroup}>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={content}
                            onEditorChange={(newContent) => setContent(newContent)}
                            init={{
                                height: 500,
                                directionality: 'rtl',
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | image media link | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.sideColumn}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>الصورة البارزة</h3>
                    <div className={styles.formGroup}>
                        <input type="hidden" name="featuredImage" value={imagePreview} />
                        <ImageUpload
                            value={imagePreview}
                            onChange={(url) => setImagePreview(url)}
                            onRemove={() => setImagePreview('')}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>التنظيم</h3>

                    <div className={styles.formGroup}>
                        <label>التصنيف</label>
                        <select
                            name="categoryId"
                            defaultValue={initialData?.categoryId || ''}
                            required
                            className={styles.select}
                        >
                            <option value="" disabled>اختر تصنيف</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nameAr}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="published"
                                defaultChecked={initialData ? initialData.published : true}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span>نشر المقال</span>
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
