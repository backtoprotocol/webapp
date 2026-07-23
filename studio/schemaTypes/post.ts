import {defineField, defineType} from 'sanity'

const contentPillars = [
  {title: 'Movement', value: 'movement'},
  {title: 'Nutrition', value: 'nutrition'},
  {title: 'Sleep', value: 'sleep'},
  {title: 'Stress', value: 'stress'},
  {title: 'Hormones', value: 'hormones'},
  {title: 'Recovery', value: 'recovery'},
  {title: 'Longevity', value: 'longevity'},
  {title: 'Mindset', value: 'mindset'},
]

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Additional tags (legacy)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      deprecated: {
        reason: 'Use Primary pillar and optional Secondary pillar for editorial taxonomy. Keep this only for specific supporting tags.',
      },
    }),
    defineField({
      name: 'primaryPillar',
      title: 'Primary pillar',
      type: 'string',
      options: {
        list: contentPillars,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryPillar',
      title: 'Secondary pillar (optional)',
      type: 'string',
      options: {
        list: contentPillars,
        layout: 'radio',
      },
      validation: (rule) =>
        rule.custom((secondaryPillar, context) => {
          if (secondaryPillar && secondaryPillar === context.document?.primaryPillar) {
            return 'Choose a different secondary pillar, or leave this blank.'
          }
          return true
        }),
    }),
    defineField({
      name: 'contentFormat',
      title: 'Content format',
      type: 'string',
      options: {
        list: [
          {title: 'Protocol', value: 'protocol'},
          {title: 'Podcast', value: 'podcast'},
          {title: 'Game', value: 'game'},
          {title: 'Article', value: 'article'},
          {title: 'News', value: 'news'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
