import { sanityClient, blogQueries } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';

export const revalidate = 60; // Revalidate every 60 seconds

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    featuredImage: string;
    category: { name: string; nameAr: string; slug: { current: string } };
    publishedAt: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await sanityClient.fetch(blogQueries.getAllPosts);
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className={styles.container} dir="rtl">
            <header className={styles.header}>
                <h1 className={styles.title}>المدونة</h1>
                <p className={styles.subtitle}>اكتشف مقالاتنا حول الصحة الطبيعية والعسل والأعشاب</p>
            </header>

            {posts.length === 0 ? (
                <div className={styles.empty}>
                    <p>لا توجد مقالات حالياً. تابعونا قريباً!</p>
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
                                {post.category && (
                                    <Link
                                        href={`/blog/category/${post.category.slug.current}`}
                                        className={styles.category}
                                    >
                                        {post.category.nameAr || post.category.name}
                                    </Link>
                                )}

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
