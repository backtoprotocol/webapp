const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectId = 'lcmmmi2e';
const dataset = 'production';
const studioDir = __dirname.replace(/\\scripts$/, '');
const tempDir = path.join(studioDir, '.tmp-research-docs');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

function writeJson(fileName, value) {
  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
  return filePath;
}

function createDocument(filePath) {
  const result = spawnSync('npx', ['sanity', 'documents', 'create', filePath, '--dataset', dataset, '--project-id', projectId, '--replace'], {
    cwd: studioDir,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    const errorOutput = [result.stdout, result.stderr].filter(Boolean).join('\n');
    throw new Error(`Failed to create document from ${filePath}:\n${errorOutput}`);
  }

  return result.stdout;
}

function createAuthor() {
  const authorDoc = {
    _id: 'back-to-protocol-author',
    _type: 'author',
    name: 'Back to Protocol Editorial',
    role: 'Research team',
    bio: 'The editorial team translates evidence into practical routines.',
  };

  const filePath = writeJson('author.json', authorDoc);
  createDocument(filePath);
}

function createArticle(overrides) {
  const article = {
    _id: overrides._id,
    _type: 'article',
    title: overrides.title,
    subtitle: overrides.subtitle,
    pillar: overrides.pillar,
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: `${overrides._id}-body`,
        children: [
          {
            _type: 'span',
            marks: [],
            text: overrides.subtitle,
            _key: `${overrides._id}-span`,
          },
        ],
        markDefs: [],
      },
    ],
    author: { _type: 'reference', _ref: 'back-to-protocol-author' },
    newsroomPlacement: overrides.newsroomPlacement || 'standard',
    publishedAt: overrides.publishedAt,
    readingMinutes: overrides.readingMinutes,
    slug: { _type: 'slug', current: overrides.slug },
  };

  const filePath = writeJson(`${overrides._id}.json`, article);
  createDocument(filePath);
}

createAuthor();

const articles = [
  {
    _id: 'research-featured',
    title: 'Recovery habits are becoming the new performance edge',
    subtitle: 'A practical research-led view into how small daily routines shape outcomes across movement and recovery.',
    pillar: 'Recovery',
    slug: 'recovery-habits-new-performance-edge',
    publishedAt: '2026-08-04T12:00:00.000Z',
    readingMinutes: 5,
    newsroomPlacement: 'featured',
  },
  {
    _id: 'research-study-card-1',
    title: 'Movement quality improves when recovery is planned in advance',
    subtitle: 'How a short pre-session routine can support steadier output and lower fatigue later in the week.',
    pillar: 'Movement',
    slug: 'movement-quality-recovery-planning',
    publishedAt: '2026-08-03T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-study-card-2',
    title: 'Sleep regularity predicts better energy than intensity alone',
    subtitle: 'A research-backed update on why consistency matters more than isolated spikes in effort.',
    pillar: 'Sleep',
    slug: 'sleep-regularity-energy',
    publishedAt: '2026-08-02T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-quick-read-1',
    title: 'Stress resets help athletes recover faster between sessions',
    subtitle: 'A concise overview of the daily habits that support mood, focus, and physical readiness.',
    pillar: 'Stress',
    slug: 'stress-resets-athletes',
    publishedAt: '2026-08-01T12:00:00.000Z',
    readingMinutes: 3,
  },
  {
    _id: 'research-quick-read-2',
    title: 'Nutrition timing can improve training consistency during busy weeks',
    subtitle: 'Simple timing changes make it easier to keep energy and appetite aligned with effort.',
    pillar: 'Nutrition',
    slug: 'nutrition-timing-training-consistency',
    publishedAt: '2026-07-31T12:00:00.000Z',
    readingMinutes: 3,
  },
  {
    _id: 'research-quick-read-3',
    title: 'A steady weekly rhythm helps recovery feel less reactive',
    subtitle: 'This research note explores why planned routines outperform ad hoc recovery habits.',
    pillar: 'Recovery',
    slug: 'steady-weekly-rhythm-recovery',
    publishedAt: '2026-07-30T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-loop-1',
    title: 'How coaches are using small recovery prompts to build better habits',
    subtitle: 'Practical stories from training environments where brief cues change adherence.',
    pillar: 'Mindset',
    slug: 'coaches-recovery-prompts-habits',
    publishedAt: '2026-07-29T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-loop-2',
    title: 'Consistency beats intensity when your schedule is already full',
    subtitle: 'A simple weekly pattern can support recovery better than occasional bursts of effort.',
    pillar: 'Recovery',
    slug: 'consistency-beats-intensity-full-schedule',
    publishedAt: '2026-07-28T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-loop-3',
    title: 'Morning movement creates steadier energy across the rest of the day',
    subtitle: 'This article links small movement cues with better mood and less fatigue later on.',
    pillar: 'Movement',
    slug: 'morning-movement-steadier-energy',
    publishedAt: '2026-07-27T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-loop-4',
    title: 'Breathing practices can lower stress before the hardest part of the week',
    subtitle: 'A short reset routine can build emotional steadiness before high-demand days begin.',
    pillar: 'Stress',
    slug: 'breathing-practices-lower-stress',
    publishedAt: '2026-07-26T12:00:00.000Z',
    readingMinutes: 3,
  },
  {
    _id: 'research-loop-5',
    title: 'Better sleep habits are a measurable lever for daily resilience',
    subtitle: 'Simple bedtime rhythms help people feel less volatile and more prepared.',
    pillar: 'Sleep',
    slug: 'better-sleep-habits-resilience',
    publishedAt: '2026-07-25T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-stories-1',
    title: 'How coaches are turning research into small acted habits',
    subtitle: 'Practical stories from training environments where brief cues change adherence.',
    pillar: 'Mindset',
    slug: 'coaches-turning-research-into-habits',
    publishedAt: '2026-07-24T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-stories-2',
    title: 'A week-by-week approach makes recovery feel less overwhelming',
    subtitle: 'This story shows how a light structure helps people follow through without overthinking.',
    pillar: 'Recovery',
    slug: 'week-by-week-approach-recovery',
    publishedAt: '2026-07-23T12:00:00.000Z',
    readingMinutes: 4,
  },
  {
    _id: 'research-stories-3',
    title: 'Small rituals create better follow-through during busy seasons',
    subtitle: 'Research and coaching experience both support lightweight routines over big resets.',
    pillar: 'Longevity',
    slug: 'small-rituals-better-follow-through',
    publishedAt: '2026-07-22T12:00:00.000Z',
    readingMinutes: 4,
  },
];

articles.forEach(createArticle);

console.log(`Created ${articles.length + 1} research documents in Sanity.`);
