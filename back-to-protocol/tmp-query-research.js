const { createClient } = require('next-sanity');
const { config } = require('dotenv');
config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-07-24',
  useCdn: false,
});

const query = '*[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...20] { _id, title, subtitle, "slug": slug.current, pillar, publishedAt, readingMinutes, author->{ _id, name } }';

client.fetch(query)
  .then((docs) => {
    console.log(JSON.stringify(docs, null, 2));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
