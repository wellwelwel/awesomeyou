/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { env } from 'node:process';
import { listFiles, sleep } from 'poku';
import { getCurrentDate, shouldUpdateFile } from './helpers/dates.mjs';

await mkdir('./static/maintainers/', { recursive: true });

const token = String(env.GITHUB_TOKEN);
const files = await listFiles('./static/maintainers/', {
  filter: /projects\.json/,
});

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

  return { name: name || username, bio, location, blog };
};

for (const file of files) {
  const username = dirname(file).split('/').pop()!;
  const base = `./static/assets/json/maintainers/${username}`;
  const filePath = `${base}/infos.json`;

  if (env.RESET_CACHE !== '1' && !(await shouldUpdateFile(filePath, 7)))
    continue;

  if (!env.GITHUB_TOKEN) {
    try {
      await readFile(filePath, 'utf8');
    } catch (error) {
      console.log('Simulating infos for', username);

      await mkdir(base, { recursive: true });
      await writeFile(
        filePath,
        JSON.stringify({ username, name: '' }, null, 0)
      );
    }

    continue;
  }

  console.log('Creating infos for', username);

  const { remaining, timeUntilReset } = await checkRateLimit();
  const currentDate = getCurrentDate();

  if (remaining <= 1) {
    const waitTimeMs = timeUntilReset * 1000;
    console.log(`⏳ Waiting for ${Math.ceil(timeUntilReset / 60)} minutes...`);
    await sleep(waitTimeMs);
  }

  const { name, bio, location, blog } = await getGitHubUserName(username);

  await mkdir(base, { recursive: true });
  await writeFile(
    filePath,
    JSON.stringify(
      { username, name, bio, location, blog, updatedAt: currentDate },
      null,
      0
    )
  );
}
