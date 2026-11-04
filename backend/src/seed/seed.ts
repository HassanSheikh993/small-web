import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { User } from '../users/schemas/user.schema';
import { Site } from '../sites/schemas/site.schema';
import { Visit } from '../visits/schemas/visit.schema';
import { USERS, SITES, TRAILS, SEED_START, STEP_MINUTES } from './seed-data';

// Plain text of the HTML, used for search.
function htmlToText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const siteModel = app.get<Model<Site>>(getModelToken(Site.name));
  const visitModel = app.get<Model<Visit>>(getModelToken(Visit.name));

  // Clear first, so seeding twice never doubles the data.
  await visitModel.deleteMany({});
  await siteModel.deleteMany({});
  await userModel.deleteMany({});

  const users = await userModel.insertMany(USERS.map((name) => ({ name })));
  const userId = new Map(users.map((u) => [String(u.name), u._id]));

  await siteModel.insertMany(
    SITES.map((s) => ({
      address: s.address,
      title: s.title,
      html: s.html,
      text: htmlToText(s.html),
      userId: userId.get(s.author),
    })),
  );

  const visits = TRAILS.flatMap((trail) =>
    trail.steps.map(([address, how], i) => ({
      user: userId.get(trail.user),
      address,
      how,
      visitedAt: new Date(
        SEED_START.getTime() + (trail.start + i * STEP_MINUTES) * 60_000,
      ),
    })),
  );
  await visitModel.insertMany(visits);

  // Make sure the search and history indexes exist.
  await Promise.all([
    userModel.syncIndexes(),
    siteModel.syncIndexes(),
    visitModel.syncIndexes(),
  ]);

  console.log(
    `Seeded ${users.length} users, ${SITES.length} sites, ${visits.length} visits.`,
  );
  await app.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
