import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'blogCategory',
    title: 'Blog Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name (English)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'nameAr',
            title: 'Name (Arabic)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description (Arabic)',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: 'nameAr',
            subtitle: 'name',
        },
    },
});
