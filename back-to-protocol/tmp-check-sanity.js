const { createClient } = require('next-sanity');
const { config } = require('dotenv');
config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-07-24',
  useCdn: false,
});

const query = '*[_id == "minimal-article"] { _id, _type, title, slug }';

client.fetch(query)
  .then((docs) => {
    console.log(JSON.stringify(docs, null, 2));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
