import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { env } from 'node:process';
import { listFiles, sleep } from 'poku';
import { getCurrentDate, shouldUpdateFile } from './helpers/dates.mjs';

const token = String(env.GITHUB_TOKEN);

const checkRateLimit = async () => {
  const response = await fetch('https://api.github.com/rate_limit', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const data = await response.json();
  const { remaining, reset } = data.rate;
  const now = Math.floor(Date.now() / 1000);
  const timeUntilReset = reset - now;

  return { remaining, timeUntilReset };
};

const getGitHubUserName = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: typeof token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const { name, bio, location, blog } = await response.json();

  return { name, bio, location, blog };
};

const files = await listFiles('./content/maintainers/', {
  filter: /projects\.json/,
});

for (const file of files) {
  const username = dirname(file).split('/').pop()!;
  const base = `./content/assets/json/maintainers/${username}`;
  const filePath = `${base}/infos.json`;

  if (!(await shouldUpdateFile(filePath, 7))) continue;

  console.log('Creating infos for', username);

  const { remaining, timeUntilReset } = await checkRateLimit();
  const currentDate = getCurrentDate();

  if (remaining <= 1) {
    const waitTimeMs = timeUntilReset * 1000;
    console.log(`⏳ Waiting for ${Math.ceil(timeUntilReset / 60)} minutes...`);
    await sleep(waitTimeMs);
  }

  getGitHubUserName(username).then(async ({ name, bio, location, blog }) => {
    await mkdir(base, { recursive: true });
    await writeFile(
      `${base}/infos.json`,
      JSON.stringify(
        { name, bio, location, blog, updatedAt: currentDate },
        null,
        0
      )
    );
  });

  await sleep(100);
}
