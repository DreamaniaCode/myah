import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

// TODO: Replace these with your actual Sanity project credentials
// You can get these from https://www.sanity.io/manage
export const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-25',
    useCdn: true,
};

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn('Warning: Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. Sanity data fetching will fail.');
}

export const sanityClient = createClient(sanityConfig);

// Helper function to generate image URLs
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

// GROQ queries for blog posts
export const blogQueries = {
    // Get all published blog posts
    getAllPosts: `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        "featuredImage": featuredImage.asset->url,
        "category": category->{ name, slug },
        publishedAt
    }`,

    // Get a single blog post by slug
    getPostBySlug: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
        _id,
        title,
        slug,
        content,
        excerpt,
        "featuredImage": featuredImage.asset->url,
        "category": category->{ name, nameAr, slug },
        publishedAt,
        "relatedPosts": *[_type == "blogPost" && slug.current != "${slug}" && published == true] | order(publishedAt desc) [0...3] {
            _id,
            title,
            slug,
            excerpt,
            "featuredImage": featuredImage.asset->url,
            publishedAt
        }
    }`,

    // Get all blog categories
    getAllCategories: `*[_type == "blogCategory"] | order(name asc) {
        _id,
        name,
        nameAr,
        slug
    }`,

    // Get posts by category
    getPostsByCategory: (categorySlug: string) => `*[_type == "blogPost" && category->slug.current == "${categorySlug}" && published == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        "featuredImage": featuredImage.asset->url,
        "category": category->{ name, nameAr, slug },
        publishedAt
    }`,
};
