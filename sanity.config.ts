import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

// TODO: Replace with your actual project ID and dataset
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

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
                return `/blog/${document.slug?.current}`;
            }
            return prev;
        },
    },
});
