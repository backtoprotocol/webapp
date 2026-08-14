const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'lcmmmi2e',
  dataset: 'production',
  apiVersion: '2026-07-24',
  useCdn: false,
});

client.fetch('*[_type == "article"]{title, "slug": slug.current, pillar, publishedAt}')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
