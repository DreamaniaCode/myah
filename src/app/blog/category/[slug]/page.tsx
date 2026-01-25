import { sanityClient, blogQueries } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from '../../blog.module.css'; // Reusing main blog styles

export const revalidate = 60;

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    featuredImage: string;
    category: { name: string; nameAr: string; slug: { current: string } };
    publishedAt: string;
}

async function getPostsByCategory(slug: string): Promise<BlogPost[]> {
    try {
        const posts = await sanityClient.fetch(blogQueries.getPostsByCategory(slug));
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts by category:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const posts = await getPostsByCategory(params.slug);

    if (posts.length === 0) {
        // Option: show empty state instead of 404 if category exists but has no posts
        // For now, let's assume if no posts, maybe category doesn't exist or just empty
    }

    // We might want to fetch category details to show the title properly
    // But for now, getting it from the first post or params is a simple start.
    // Better approach: Fetch category details separately.

    // Let's assume we want to show the category name. 
    // Since we don't have a separate "getCategory" query yet, we can use the first post's category info if available,
    // or just display the slug for now, or fetch category details.
    // Let's rely on the posts for now.

    const categoryName = posts.length > 0 ? (posts[0].category.nameAr || posts[0].category.name) : params.slug;

    return (
        <div className={styles.container} dir="rtl">
            <header className={styles.header}>
                <div className={styles.subtitle}>التصنيف</div>
                <h1 className={styles.title}>{categoryName}</h1>
                <Link href="/blog" className={styles.readMore} style={{ display: 'inline-block', marginTop: '1rem' }}>
                    ← عرض كل المقالات
                </Link>
            </header>

            {posts.length === 0 ? (
                <div className={styles.empty}>
                    <p>لا توجد مقالات في هذا التصنيف حالياً.</p>
                    <Link href="/blog" className={styles.readMore}>
                        العودة للمدونة
                    </Link>
                </div>
            ) : (
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <article key={post._id} className={styles.card}>
                            {post.featuredImage && (
                                <Link href={`/blog/${post.slug.current}`}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            className={styles.image}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </Link>
                            )}

                            <div className={styles.content}>
                                <span className={styles.category}>
                                    {post.category.nameAr || post.category.name}
                                </span>

                                <h2 className={styles.cardTitle}>
                                    <Link href={`/blog/${post.slug.current}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                {post.excerpt && (
                                    <p className={styles.excerpt}>{post.excerpt}</p>
                                )}

                                <div className={styles.meta}>
                                    <time dateTime={post.publishedAt}>
                                        {new Date(post.publishedAt).toLocaleDateString('ar-MA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                    <Link
                                        href={`/blog/${post.slug.current}`}
                                        className={styles.readMore}
                                    >
                                        اقرأ المزيد ←
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
