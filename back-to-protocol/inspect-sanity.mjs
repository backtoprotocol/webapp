import { client } from './src/sanity/lib/client.ts';

const query = `*[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...20] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  pillar
}`;

const articles = await client.fetch(query);
console.log(JSON.stringify(articles, null, 2));
