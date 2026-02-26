import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from '../../blog.module.css'; // Reusing main blog styles
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/app/actions/settings";


export const revalidate = 60;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch category by slug to get its ID and name
    const category = await prisma.blogCategory.findUnique({
        where: { slug: slug },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!category) {
        notFound();
    }

    const posts = category.posts;
    const categoryName = category.nameAr || category.name;

    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    return (
        <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header settingsPromise={settingsPromise} />
            <div className={styles.container} dir="rtl" style={{ flex: 1, width: '100%' }}>
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
                        {posts.map((post) => {
                            return (
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
                                        <span className={styles.category}>
                                            {categoryName}
                                        </span>

                                        <h2 className={styles.cardTitle}>
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {post.excerpt && (
                                            <div className={styles.excerpt}>{post.excerpt}</div>
                                        )}

                                        <div className={styles.meta}>
                                            <time dateTime={post.createdAt.toISOString()} suppressHydrationWarning>
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
                            );
                        })}
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
