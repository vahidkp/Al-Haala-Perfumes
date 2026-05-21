import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'announcementMessages',
      title: 'Announcement Bar Messages',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'These rotate in the top announcement bar',
    }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'string' }),
    defineField({ name: 'heroCta', title: 'Hero CTA Button Label', type: 'string' }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string' }),
    defineField({
      name: 'newsletterHeadline',
      title: 'Newsletter Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (with country code)',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
