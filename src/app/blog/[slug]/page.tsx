import { sanityClient, blogQueries } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './post.module.css';

export const revalidate = 60;

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    content: any;
    excerpt: string;
    featuredImage: string;
    category: { name: string; nameAr: string; slug: { current: string } };
    publishedAt: string;
    relatedPosts: any[];
}

async function getPost(slug: string): Promise<BlogPost | null> {
    try {
        const post = await sanityClient.fetch(blogQueries.getPostBySlug(slug));
        return post;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

// Portable Text components for custom rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className={styles.contentImage}>
                    <Image
                        src={value.asset.url || ''}
                        alt={value.alt || ' '}
                        width={800}
                        height={450}
                        className={styles.image}
                    />
                </div>
            );
        },
    },
    marks: {
        link: ({ children, value }: any) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
            return (
                <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
                    {children}
                </a>
            );
        },
    },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.container} dir="rtl">
            <article className={styles.article}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.meta}>
                        {post.category && (
                            <Link
                                href={`/blog/category/${post.category.slug.current}`}
                                className={styles.category}
                            >
                                {post.category.nameAr || post.category.name}
                            </Link>
                        )}
                        <time dateTime={post.publishedAt} className={styles.date}>
                            {new Date(post.publishedAt).toLocaleDateString('ar-MA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>

                    {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
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
                <div className={styles.content}>
                    <PortableText value={post.content} components={portableTextComponents} />
                </div>

                {/* Back to blog */}
                <div className={styles.backLink}>
                    <Link href="/blog">← العودة إلى المدونة</Link>
                </div>
            </article>

            {/* Related Posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
                <aside className={styles.related}>
                    <h2>مقالات ذات صلة</h2>
                    <div className={styles.relatedGrid}>
                        {post.relatedPosts.map((related) => (
                            <Link
                                key={related._id}
                                href={`/blog/${related.slug.current}`}
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
                                    {related.excerpt && <p>{related.excerpt}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </aside>
            )}
        </div>
    );
}
