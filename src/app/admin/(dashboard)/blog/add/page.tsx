import { createBlogPost, getBlogCategories } from '@/app/actions';
import BlogPostForm from '@/components/admin/BlogPostForm';
import Link from 'next/link';

export default async function AddBlogPostPage() {
    const categories = await getBlogCategories();

    return (
        <div dir="rtl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>إضافة مقال جديد</h1>
                <Link
                    href="/admin/blog"
                    style={{ padding: '0.5rem 1rem', background: '#E5E7EB', borderRadius: '6px', fontSize: '0.9rem', color: '#374151' }}
                >
                    &larr; رجوع
                </Link>
            </div>

            <BlogPostForm
                action={createBlogPost}
                categories={categories}
                submitLabel="نشر المقال"
            />
        </div>
    );
}
