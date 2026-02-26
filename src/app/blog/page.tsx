import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/app/actions/settings";


export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });

    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    return (
        <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header settingsPromise={settingsPromise} />
            <div className={styles.container} dir="rtl" style={{ flex: 1, width: '100%' }}>
                <header className={styles.header}>
                    <h1 className={styles.title}>المدونة</h1>
                    <p className={styles.subtitle}>اكتشف مقالاتنا حول الصحة الطبيعية والعسل والأعشاب</p>
                </header>

                {posts.length === 0 ? (
                    <div className={styles.empty}>
                        <p>لا توجد مقالات حالياً.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {posts.map((post) => (
                            <article key={post.id} className={styles.card}>
                                {post.featuredImage && (
                                    <Link href={`/blog/${post.slug}`}>
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
                                            href={`/blog/category/${post.category.slug}`}
                                            className={styles.category}
                                        >
                                            {post.category.nameAr || post.category.name}
                                        </Link>
                                    )}

                                    <h2 className={styles.cardTitle}>
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {post.excerpt && (
                                        <div className={styles.excerpt}>
                                            {post.excerpt}
                                        </div>
                                    )}

                                    <div className={styles.meta}>
                                        <time dateTime={post.createdAt.toISOString()} className={styles.date} suppressHydrationWarning>
                                            {post.createdAt.toLocaleDateString('ar-MA', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                        <Link
                                            href={`/blog/${post.slug}`}
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
            <Footer
                siteName={settings.siteName as string}
                contactPhone={settings.contactPhone as string}
                contactEmail={settings.contactEmail as string}
                contactAddress={settings.contactAddress as string}
            />
        </main>
    );
}
