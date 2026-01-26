import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

export default defineConfig({
    name: 'herbs-myah-blog',
    title: 'Herbs MYAH Blog',

    projectId,
    dataset,

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },

    // Configure for Arabic (RTL)
    document: {
        productionUrl: async (prev, context) => {
            const { document } = context;
            if (document._type === 'blogPost') {
                const slug = document.slug as { current: string } | undefined;
                return `/blog/${slug?.current}`;
            }
            return prev;
        },
    },
});
