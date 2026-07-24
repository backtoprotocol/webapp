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

export const ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`);
