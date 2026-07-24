import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  asset->{
    _id,
    metadata { lqip, dimensions }
  },
  alt,
  crop,
  hotspot
`;

const articleCardFields = /* groq */ `
  _id,
  title,
  subtitle,
  "slug": slug.current,
  pillar,
  publishedAt,
  readingMinutes,
  author->{ _id, name },
  coverImage { ${imageFields} }
`;

export const ARTICLE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && slug.current == $slug][0]{
    ${articleCardFields},
    body[]{
      ...,
      _type == "articleImage" => {
        ...,
        image { ${imageFields} }
      }
    },
    author->{ name, role, bio, image { ${imageFields} } },
    seo { metaTitle, metaDescription }
  }
`);

export const RELATED_ARTICLES_QUERY = defineQuery(/* groq */ `
  *[
    _type == "article" &&
    defined(slug.current) &&
    pillar == $pillar &&
    _id != $articleId
  ] | order(publishedAt desc)[0...3] {
    ${articleCardFields}
  }
`);

export const ARTICLES_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc)[0...12] {
    ${articleCardFields}
  }
`);

export const NEWSROOM_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc)[0...80] {
    ${articleCardFields}
  }
`);

export const FEATURED_ARTICLE_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current) && newsroomPlacement == "featured"] | order(publishedAt desc)[0] { ${articleCardFields} }
`);
export const NEWSROOM_AUTHORS_QUERY = defineQuery(/* groq */ `*[_type == "author"] | order(name asc) { _id, name }`);
export const FILTERED_ARTICLES_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current) && (!defined($pillar) || pillar == $pillar) && (!defined($author) || author._ref == $author)] | order(publishedAt desc) [$start...$end] { ${articleCardFields} }
`);
export const FILTERED_ARTICLES_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[_type == "article" && defined(slug.current) && (!defined($pillar) || pillar == $pillar) && (!defined($author) || author._ref == $author)])
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`);
