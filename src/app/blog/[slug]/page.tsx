import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './post.module.css';

export const revalidate = 60;

export async function generateStaticParams() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            select: { slug: true }
        });
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        return [];
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug: slug },
        include: { category: true }
    });

    if (!post || !post.published) {
        notFound();
    }

    const relatedPosts = await prisma.blogPost.findMany({
        where: {
            categoryId: post.categoryId,
            id: { not: post.id },
            published: true
        },
        take: 3
    });

    return (
        <div className={styles.container} dir="rtl">
            <article className={styles.article}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.meta}>
                        {post.category && (
                            <Link
                                href={`/blog/category/${post.category.slug}`}
                                className={styles.category}
                            >
                                {post.category.nameAr || post.category.name}
                            </Link>
                        )}
                        <time dateTime={post.createdAt.toISOString()} className={styles.date} suppressHydrationWarning>
                            {post.createdAt.toLocaleDateString('ar-MA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>

                    {post.excerpt && (
                        <div className={styles.excerpt}>{post.excerpt}</div>
                    )}
                </header>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className={styles.featuredImage}>
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            width={1200}
                            height={600}
                            className={styles.image}
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Back to blog */}
                <div className={styles.backLink}>
                    <Link href="/blog">← العودة إلى المدونة</Link>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <aside className={styles.related}>
                    <h2>مقالات ذات صلة</h2>
                    <div className={styles.relatedGrid}>
                        {relatedPosts.map((related) => {
                            return (
                                <Link
                                    key={related.id}
                                    href={`/blog/${related.slug}`}
                                    className={styles.relatedCard}
                                >
                                    {related.featuredImage && (
                                        <div className={styles.relatedImage}>
                                            <Image
                                                src={related.featuredImage}
                                                alt={related.title}
                                                fill
                                                className={styles.image}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className={styles.relatedContent}>
                                        <h3>{related.title}</h3>
                                        {related.excerpt && (
                                            <div className={styles.excerpt}>{related.excerpt}</div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </aside>
            )}
        </div>
    );
}
