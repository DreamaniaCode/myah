export const dynamic = 'force-dynamic';
import { updateBlogPost, getBlogPost, getBlogCategories } from '@/app/actions';
import BlogPostForm from '@/components/admin/BlogPostForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getBlogPost(id);
    const categories = await getBlogCategories();

    if (!post) {
        notFound();
    }

    return (
        <div dir="rtl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>تعديل المقال: {post.title}</h1>
                <Link
                    href="/admin/blog"
                    style={{ padding: '0.5rem 1rem', background: '#E5E7EB', borderRadius: '6px', fontSize: '0.9rem', color: '#374151' }}
                >
                    &larr; رجوع
                </Link>
            </div>

            <BlogPostForm
                action={updateBlogPost.bind(null, id)}
                initialData={post}
                categories={categories}
                submitLabel="حفظ التغييرات"
            />
        </div>
    );
}
