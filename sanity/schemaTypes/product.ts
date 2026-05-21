import { defineType, defineField, defineArrayMember } from 'sanity'

const noteField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Note Name', type: 'string' }),
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
        ],
      }),
    ],
  })

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({
      name: 'price',
      title: 'Base Price (AED)',
      type: 'number',
      validation: (R) => R.required().positive(),
    }),
    defineField({ name: 'compareAtPrice', title: 'Compare At Price (AED)', type: 'number' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'variants',
      title: 'Variants (Volume)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'volume', title: 'Volume (e.g. 100ml)', type: 'string' }),
            defineField({ name: 'price', title: 'Price (AED)', type: 'number' }),
            defineField({ name: 'compareAtPrice', title: 'Compare At (AED)', type: 'number' }),
            defineField({ name: 'stock', title: 'Stock', type: 'number' }),
            defineField({ name: 'sku', title: 'SKU', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { value: 'bestseller', title: 'Best Seller' },
          { value: 'new', title: 'New' },
          { value: 'sale', title: 'Sale' },
          { value: 'featured', title: 'Featured' },
          { value: 'fragrance-of-week', title: 'Fragrance of the Week' },
        ],
      },
    }),
    defineField({ name: 'inspiredBy', title: 'Inspired By Brand', type: 'string' }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: { list: ['men', 'women', 'unisex'], layout: 'radio' },
    }),
    defineField({ name: 'fragranceFamily', title: 'Fragrance Family', type: 'string' }),
    defineField({
      name: 'concentration',
      title: 'Concentration',
      type: 'string',
      options: { list: ['EDP', 'EDP Intense', 'EDP Extrait', 'EDT', 'Attar'] },
    }),
    defineField({
      name: 'notes',
      title: 'Fragrance Notes',
      type: 'object',
      fields: [
        noteField('opening', 'Opening Notes (Top)'),
        noteField('heart', 'Heart Notes (Mid)'),
        noteField('dryDown', 'Dry-Down Notes (Base)'),
      ],
    }),
    defineField({
      name: 'giftBoxAvailable',
      title: 'Gift Box Available?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'giftBoxPrice', title: 'Gift Box Price (AED)', type: 'number' }),
    defineField({
      name: 'isFeaturedOfWeek',
      title: 'Fragrance of the Week?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0.asset', subtitle: 'category.name' },
  },
})
