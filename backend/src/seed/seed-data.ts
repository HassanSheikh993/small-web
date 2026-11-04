// Fixed seed data. No randomness, so every run gives the same web.

export const USERS = ['ada', 'bo', 'cleo', 'dev', 'eli'];

// Broken links (addresses that never existed): driftwood.zz, oldmoon.zz, crumbs.zz, inkwell.zz
export const SITES = [
  {
    address: 'tidepool.zz',
    title: 'Tidepool',
    author: 'ada',
    html: `<h1>Tidepool</h1>
<p>When the tide goes out, the rocks below the cliff turn into a hundred small worlds. Anemones close up like fists, crabs back into cracks, and tiny fish wait for the sea to come home.</p>
<p>I visit at dawn, when the water is still and the light comes in low. Bring boots, and never lift a rock without putting it back the way you found it.</p>
<p>Further reading: the <a href="lighthouse.zz">lighthouse</a> above the bay, the <a href="kelp.zz">kelp forest</a> just offshore, and my old notes on <a href="driftwood.zz">driftwood</a>.</p>`,
  },
  {
    address: 'kelp.zz',
    title: 'The Kelp Forest',
    author: 'ada',
    html: `<h1>The Kelp Forest</h1>
<p>Kelp can grow half a metre in a single day. Underwater it stands like a forest of brown ribbons, swaying with every swell, and sea otters wrap themselves in it to sleep.</p>
<p>The forest shelters fish, urchins and snails. When urchins grow too many, they eat the kelp to bare rock, and the whole forest can vanish in a season.</p>
<p>Walk back to the <a href="tidepool.zz">tidepool</a>, across to the <a href="saltmarsh.zz">salt marsh</a>, or try kelp in bread at <a href="sourdough.zz">sourdough</a>.</p>`,
  },
  {
    address: 'saltmarsh.zz',
    title: 'Salt Marsh Diary',
    author: 'ada',
    html: `<h1>Salt Marsh Diary</h1>
<p>Twice a day the sea floods the marsh and twice a day it leaves. Samphire and sea lavender grow where nothing else can stand the salt, and herons stand still for an hour waiting for one fish.</p>
<p>The mud smells of sulphur and is deeper than it looks. I lost a boot here in March and have not been back for it.</p>
<p>See also the <a href="kelp.zz">kelp forest</a>, the soft green <a href="moss.zz">moss</a> on the sea wall, and the <a href="lighthouse.zz">lighthouse</a> at the far end.</p>`,
  },
  {
    address: 'lighthouse.zz',
    title: 'Keeping the Light',
    author: 'bo',
    html: `<h1>Keeping the Light</h1>
<p>The lighthouse on the headland was built in 1871 and kept by hand for a hundred years. Every night someone climbed 112 steps to wind the clockwork that turned the lens.</p>
<p>Now it runs itself, but the keeper's cottage still stands, and on clear nights you can watch the beam sweep across the water every ten seconds.</p>
<p>Below it lies the <a href="tidepool.zz">tidepool</a>. Above it, the <a href="stargazer.zz">stars</a>. Behind it, the <a href="saltmarsh.zz">salt marsh</a>.</p>`,
  },
  {
    address: 'stargazer.zz',
    title: 'Stargazer',
    author: 'bo',
    html: `<h1>Stargazer</h1>
<p>You do not need a telescope to start. Find a dark field, wait twenty minutes for your eyes to adjust, and the sky fills with stars you never knew were there.</p>
<p>Start with the Plough, follow its pointer stars to the Pole Star, and you will always know where north is. On a moonless August night you may see a meteor every few minutes.</p>
<p>Stay up late with the <a href="nightowl.zz">night owls</a>, head back to the <a href="lighthouse.zz">lighthouse</a>, or read my page about the <a href="oldmoon.zz">old moon</a>.</p>`,
  },
  {
    address: 'nightowl.zz',
    title: 'Night Owl',
    author: 'bo',
    html: `<h1>Night Owl</h1>
<p>Some of us do our best thinking after midnight. The house is quiet, the phone is silent, and the only sound is the kettle and the owl in the oak outside.</p>
<p>A tawny owl calls in pairs: the female says "ke-wick" and the male answers "hoo-hoo". Listen for them in autumn, when the young are looking for land of their own.</p>
<p>Look up at the <a href="stargazer.zz">stars</a>, write it all down on a <a href="typewriter.zz">typewriter</a>, or walk out onto the <a href="moss.zz">moss</a>.</p>`,
  },
  {
    address: 'breadcrumb.zz',
    title: 'Breadcrumb Trail',
    author: 'cleo',
    html: `<h1>Breadcrumb Trail</h1>
<p>A list of small things worth following. Each one leads somewhere, and some of them lead back here. That is the point of a trail.</p>
<p>I started this page to remember the walks I liked. Now it is mostly a list of other people's pages that made me stop and read.</p>
<p>Follow the crumbs to <a href="sourdough.zz">sourdough</a>, the quiet <a href="moss.zz">moss</a> garden, or the old <a href="typewriter.zz">typewriter</a>.</p>`,
  },
  {
    address: 'sourdough.zz',
    title: 'Sourdough Every Sunday',
    author: 'cleo',
    html: `<h1>Sourdough Every Sunday</h1>
<p>My starter is called Gerald and he is eleven years old. Flour, water and patience are all he needs. Feed him on Saturday, and by Sunday morning he is bubbling and ready.</p>
<p>Mix the dough, fold it four times an hour apart, and let it rise slowly in the fridge overnight. A long cold rise gives the crust its blisters and the crumb its sour tang.</p>
<p>Back to the <a href="breadcrumb.zz">breadcrumb trail</a>, try seaweed bread with <a href="kelp.zz">kelp</a>, or see what to do with <a href="crumbs.zz">leftover crumbs</a>.</p>`,
  },
  {
    address: 'moss.zz',
    title: 'A Moss Garden',
    author: 'dev',
    html: `<h1>A Moss Garden</h1>
<p>Moss has no roots, no flowers and no seeds. It drinks through its leaves and can dry out completely, then turn green again within an hour of rain.</p>
<p>My garden is a shady corner of stones and old logs. I never water it and never mow it. It grows slower than anything else I own, and I like it best.</p>
<p>Moss also grows on the sea wall by the <a href="saltmarsh.zz">salt marsh</a>. Visit the <a href="nightowl.zz">night owl</a>, or follow the <a href="breadcrumb.zz">breadcrumb trail</a>.</p>`,
  },
  {
    address: 'typewriter.zz',
    title: 'The Typewriter',
    author: 'dev',
    html: `<h1>The Typewriter</h1>
<p>I bought a 1962 portable typewriter for the price of a sandwich. It needed a new ribbon and a drop of oil, and now it writes every letter I send.</p>
<p>There is no delete key. You think before you type, and every mistake stays on the page. My drafts are slower and my letters are better.</p>
<p>Written late with the <a href="nightowl.zz">night owl</a>, listed on the <a href="breadcrumb.zz">breadcrumb trail</a>. Ink and ribbons at the <a href="inkwell.zz">inkwell</a>.</p>`,
  },
];

// Browsing trails. Each step is 3 minutes after the previous one.
// "start" is minutes after SEED_START. Together they cover about an hour.
export const SEED_START = new Date('2026-01-15T10:00:00Z');
export const STEP_MINUTES = 3;

type How = 'typed' | 'link' | 'back' | 'forward' | 'history' | 'search';

export const TRAILS: { user: string; start: number; steps: [string, How][] }[] = [
  // eli has been nearly everywhere
  {
    user: 'eli',
    start: 0,
    steps: [
      ['tidepool.zz', 'typed'],
      ['lighthouse.zz', 'link'],
      ['stargazer.zz', 'link'],
      ['nightowl.zz', 'link'],
      ['typewriter.zz', 'link'],
      ['breadcrumb.zz', 'link'],
      ['sourdough.zz', 'link'],
      ['kelp.zz', 'link'],
      ['saltmarsh.zz', 'link'],
      ['moss.zz', 'link'],
      ['saltmarsh.zz', 'back'],
      ['lighthouse.zz', 'link'],
      ['tidepool.zz', 'history'],
      ['driftwood.zz', 'link'],
    ],
  },
  {
    user: 'ada',
    start: 5,
    steps: [
      ['tidepool.zz', 'typed'],
      ['kelp.zz', 'link'],
      ['saltmarsh.zz', 'link'],
      ['kelp.zz', 'back'],
      ['sourdough.zz', 'link'],
    ],
  },
  {
    user: 'bo',
    start: 10,
    steps: [
      ['stargazer.zz', 'typed'],
      ['nightowl.zz', 'link'],
      ['stargazer.zz', 'back'],
      ['oldmoon.zz', 'link'],
    ],
  },
  // a long trail
  {
    user: 'cleo',
    start: 20,
    steps: [
      ['sourdough.zz', 'search'],
      ['breadcrumb.zz', 'link'],
      ['moss.zz', 'link'],
      ['nightowl.zz', 'link'],
      ['typewriter.zz', 'link'],
      ['inkwell.zz', 'link'],
    ],
  },
  // another long trail
  {
    user: 'dev',
    start: 30,
    steps: [
      ['moss.zz', 'typed'],
      ['saltmarsh.zz', 'link'],
      ['kelp.zz', 'link'],
      ['tidepool.zz', 'link'],
      ['lighthouse.zz', 'link'],
      ['stargazer.zz', 'link'],
    ],
  },
  // repeat visits
  {
    user: 'ada',
    start: 45,
    steps: [
      ['tidepool.zz', 'typed'],
      ['kelp.zz', 'link'],
    ],
  },
  {
    user: 'dev',
    start: 54,
    steps: [['moss.zz', 'typed']],
  },
];
