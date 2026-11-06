// Fixed seed data. No randomness, so every run gives the same web.

export const USERS = ['ali', 'hassan', 'usama', 'sara'];

// Broken links (addresses that never existed): driftwood.zz, oldmoon.zz, crumbs.zz, inkwell.zz
export const SITES = [
  {
    address: 'tidepool.zz',
    title: 'Tidepool',
    author: 'ali',
    html: `<h1>Tidepool</h1>
<p>When the tide goes out, the rocks below the cliff turn into a hundred small worlds. Anemones close up like fists, crabs back into cracks, and tiny fish wait for the sea to come home.</p>
<p>I visit at dawn, when the water is still and the light comes in low. Bring boots, and never lift a rock without putting it back the way you found it.</p>
<h2>Who lives here</h2>
<p>Beadlet anemones are the easiest to find. Out of the water they look like blobs of red jelly, but put them back under the surface and they open into a ring of soft tentacles that sting anything small enough to eat.</p>
<p>Shore crabs hide under the larger stones. Lift one slowly and you will see them run sideways into the dark, holding their claws up as if they could fight off a hand a hundred times their size.</p>
<p>Limpets clamp to the rock so hard that you cannot pull them off. When the tide comes back in, they wander slowly across the stone grazing on algae, and before the water leaves again they return to the exact spot they started from.</p>
<p>Periwinkles, dog whelks and top shells gather in the cracks. The dog whelk is a hunter: it drills a neat round hole through the shell of a mussel and eats it from the inside.</p>
<h2>Reading the tide</h2>
<p>The best pools appear at spring tides, twice a month, when the moon and sun pull together and the sea goes out further than usual. The tide tables in the harbour office list the times for the whole year.</p>
<p>Always watch the water behind you. The tide comes back faster than you think, and the rocks at the far end of the bay are cut off long before the beach is covered.</p>
<p>A rising tide fills the lowest pools first. If you sit still at the edge of one, you can watch the first wave arrive, the anemones open, and the crabs come out of hiding as the pool joins the sea again.</p>
<h2>A few rules</h2>
<p>Put every rock back the way it was, with the weed side up. Do not take anything home, not even an empty shell, because a hermit crab may be looking for it. Keep your hands wet before touching anything alive.</p>
<p>And go slowly. A tidepool rewards patience more than anything else. The longer you look, the more there is to see.</p>
<p>Further reading: the <a href="lighthouse.zz">lighthouse</a> above the bay, the <a href="kelp.zz">kelp forest</a> just offshore, and my old notes on <a href="driftwood.zz">driftwood</a>.</p>`,
  },
  {
    address: 'kelp.zz',
    title: 'The Kelp Forest',
    author: 'ali',
    html: `<h1>The Kelp Forest</h1>
<p>Kelp can grow half a metre in a single day. Underwater it stands like a forest of brown ribbons, swaying with every swell, and sea otters wrap themselves in it to sleep.</p>
<p>The forest shelters fish, urchins and snails. When urchins grow too many, they eat the kelp to bare rock, and the whole forest can vanish in a season.</p>
<p>Walk back to the <a href="tidepool.zz">tidepool</a>, across to the <a href="saltmarsh.zz">salt marsh</a>, or try kelp in bread at <a href="sourdough.zz">sourdough</a>.</p>`,
  },
  {
    address: 'saltmarsh.zz',
    title: 'Salt Marsh Diary',
    author: 'ali',
    html: `<h1>Salt Marsh Diary</h1>
<p>Twice a day the sea floods the marsh and twice a day it leaves. Samphire and sea lavender grow where nothing else can stand the salt, and herons stand still for an hour waiting for one fish.</p>
<p>The mud smells of sulphur and is deeper than it looks. I lost a boot here in March and have not been back for it.</p>
<p>See also the <a href="kelp.zz">kelp forest</a>, the soft green <a href="moss.zz">moss</a> on the sea wall, and the <a href="lighthouse.zz">lighthouse</a> at the far end.</p>`,
  },
  {
    address: 'lighthouse.zz',
    title: 'Keeping the Light',
    author: 'hassan',
    html: `<h1>Keeping the Light</h1>
<p>The lighthouse on the headland was built in 1871 and kept by hand for a hundred years. Every night someone climbed 112 steps to wind the clockwork that turned the lens.</p>
<p>Now it runs itself, but the keeper's cottage still stands, and on clear nights you can watch the beam sweep across the water every ten seconds.</p>
<h2>The keepers</h2>
<p>Three keepers lived here at a time, working in shifts so that the light was never left alone. One kept the lamp, one kept the log, and one slept. Every hour the keeper on duty wrote down the weather, the wind and every ship that passed.</p>
<p>The logbooks are still in the cottage. Most entries are short: "Wind north east, fresh. Two colliers passed. All well." But in the storm of 1903 the entries run for pages, written by a keeper who did not sleep for three days.</p>
<p>The last keeper left in 1971, when the light was made automatic. He said the hardest part was the quiet. For forty years he had heard the clockwork turning every minute of every night.</p>
<h2>The lens</h2>
<p>The lens is taller than a person and made of hundreds of glass prisms set in brass. It gathers the light of one lamp and throws it as a single beam that can be seen from thirty kilometres out to sea.</p>
<p>Each lighthouse along the coast flashes in its own pattern, so sailors can tell them apart in the dark. This one gives two white flashes every ten seconds. Its neighbour to the south gives one red flash every five.</p>
<p>Cleaning the lens was a daily job. The keeper wiped every prism by hand with a soft cloth, because a film of salt or soot could cut the beam in half.</p>
<h2>Visiting</h2>
<p>The tower is open on summer weekends. The climb is steep and narrow, and the last ladder to the lamp room is not for anyone afraid of heights, but the view from the gallery takes in the whole bay.</p>
<p>Bring a coat, even in August. The wind at the top never stops.</p>
<p>Below it lies the <a href="tidepool.zz">tidepool</a>. Above it, the <a href="stargazer.zz">stars</a>. Behind it, the <a href="saltmarsh.zz">salt marsh</a>.</p>`,
  },
  {
    address: 'stargazer.zz',
    title: 'Stargazer',
    author: 'hassan',
    html: `<h1>Stargazer</h1>
<p>You do not need a telescope to start. Find a dark field, wait twenty minutes for your eyes to adjust, and the sky fills with stars you never knew were there.</p>
<p>Start with the Plough, follow its pointer stars to the Pole Star, and you will always know where north is. On a moonless August night you may see a meteor every few minutes.</p>
<p>Stay up late with the <a href="nightowl.zz">night owls</a>, head back to the <a href="lighthouse.zz">lighthouse</a>, or read my page about the <a href="oldmoon.zz">old moon</a>.</p>`,
  },
  {
    address: 'nightowl.zz',
    title: 'Night Owl',
    author: 'hassan',
    html: `<h1>Night Owl</h1>
<p>Some of us do our best thinking after midnight. The house is quiet, the phone is silent, and the only sound is the kettle and the owl in the oak outside.</p>
<p>A tawny owl calls in pairs: the female says "ke-wick" and the male answers "hoo-hoo". Listen for them in autumn, when the young are looking for land of their own.</p>
<p>Look up at the <a href="stargazer.zz">stars</a>, write it all down on a <a href="typewriter.zz">typewriter</a>, or walk out onto the <a href="moss.zz">moss</a>.</p>`,
  },
  {
    address: 'breadcrumb.zz',
    title: 'Breadcrumb Trail',
    author: 'usama',
    html: `<h1>Breadcrumb Trail</h1>
<p>A list of small things worth following. Each one leads somewhere, and some of them lead back here. That is the point of a trail.</p>
<p>I started this page to remember the walks I liked. Now it is mostly a list of other people's pages that made me stop and read.</p>
<p>Follow the crumbs to <a href="sourdough.zz">sourdough</a>, the quiet <a href="moss.zz">moss</a> garden, or the old <a href="typewriter.zz">typewriter</a>.</p>`,
  },
  {
    address: 'sourdough.zz',
    title: 'Sourdough Every Sunday',
    author: 'usama',
    html: `<h1>Sourdough Every Sunday</h1>
<p>My starter is called Gerald and he is eleven years old. Flour, water and patience are all he needs. Feed him on Saturday, and by Sunday morning he is bubbling and ready.</p>
<p>Mix the dough, fold it four times an hour apart, and let it rise slowly in the fridge overnight. A long cold rise gives the crust its blisters and the crumb its sour tang.</p>
<p>Back to the <a href="breadcrumb.zz">breadcrumb trail</a>, try seaweed bread with <a href="kelp.zz">kelp</a>, or see what to do with <a href="crumbs.zz">leftover crumbs</a>.</p>`,
  },
  {
    address: 'moss.zz',
    title: 'A Moss Garden',
    author: 'sara',
    html: `<h1>A Moss Garden</h1>
<p>Moss has no roots, no flowers and no seeds. It drinks through its leaves and can dry out completely, then turn green again within an hour of rain.</p>
<p>My garden is a shady corner of stones and old logs. I never water it and never mow it. It grows slower than anything else I own, and I like it best.</p>
<p>Moss also grows on the sea wall by the <a href="saltmarsh.zz">salt marsh</a>. Visit the <a href="nightowl.zz">night owl</a>, or follow the <a href="breadcrumb.zz">breadcrumb trail</a>.</p>`,
  },
  {
    address: 'typewriter.zz',
    title: 'The Typewriter',
    author: 'sara',
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
  // hassan has been nearly everywhere
  {
    user: 'hassan',
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
    user: 'ali',
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
    user: 'hassan',
    start: 42,
    steps: [
      ['stargazer.zz', 'typed'],
      ['nightowl.zz', 'link'],
      ['stargazer.zz', 'back'],
      ['oldmoon.zz', 'link'],
    ],
  },
  // a long trail
  {
    user: 'usama',
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
    user: 'sara',
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
    user: 'ali',
    start: 45,
    steps: [
      ['tidepool.zz', 'typed'],
      ['kelp.zz', 'link'],
    ],
  },
  {
    user: 'sara',
    start: 54,
    steps: [['moss.zz', 'typed']],
  },
];
