/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { cwd, env } from 'node:process';
import { Builder, parseStringPromise } from 'xml2js';

type UrlEntry = {
  loc: string[];
  changefreq: string[];
  priority: string[];
  [key: string]: any;
};

type SitemapData = {
  urlset: {
    $: Record<string, string>;
    url: UrlEntry[];
  };
};

type SitemapRule = {
  pattern: RegExp | string;
  config: {
    changefreq: string;
    priority: string;
  };
};

const sitemapPath = path.join(cwd(), 'build', 'sitemap.xml');

const manualRoutes: { path: string; config: SitemapRule['config'] }[] = [
  {
    path: '/llms.txt',
    config: { changefreq: 'daily', priority: '0.5' },
  },
];

const sitemapRules: SitemapRule[] = [
  {
    pattern: '/calculator/',
    config: { changefreq: 'monthly', priority: '0.1' },
  },
  {
    pattern: '/new/',
    config: { changefreq: 'monthly', priority: '0.1' },
  },
  {
    pattern: 'https://awesomeyou.io/projects/',
    config: { changefreq: 'daily', priority: '1.0' },
  },
  {
    pattern: /^https:\/\/awesomeyou\.io\/maintainers\/$/,
    config: { changefreq: 'weekly', priority: '0.5' },
  },
  {
    pattern: '/maintainers/',
    config: { changefreq: 'weekly', priority: '0.8' },
  },
  {
    pattern: /^https:\/\/awesomeyou\.io\/$/,
    config: { changefreq: 'weekly', priority: '0.7' },
  },
];

const sitemapXml = await readFile(sitemapPath, 'utf8');
const sitemap = (await parseStringPromise(sitemapXml)) as SitemapData;

if (!sitemap.urlset?.url) throw new Error('Invalid sitemap');

const changes: Record<
  string,
  {
    oldFreq: string;
    newFreq: string;
    oldPriority: string;
    newPriority: string;
  }
> = Object.create(null);

sitemap.urlset.url = sitemap.urlset.url.map((entry) => {
  const currentUrl = entry.loc[0];
  const oldFreq = entry.changefreq[0];
  const oldPriority = entry.priority[0];

  const matchingRule = sitemapRules.find((rule) => {
    if (typeof rule.pattern === 'string')
      return currentUrl.includes(rule.pattern);

    return rule.pattern.test(currentUrl);
  });

  if (matchingRule) {
    const { changefreq, priority } = matchingRule.config;

    changes[currentUrl] = {
      oldFreq,
      newFreq: changefreq,
      oldPriority,
      newPriority: priority,
    };

    return {
      ...entry,
      changefreq: [changefreq],
      priority: [priority],
    };
  }

  return entry;
});

for (const route of manualRoutes) {
  const url = `https://awesomeyou.io${route.path}`;

  const newEntry: UrlEntry = {
    loc: [url],
    changefreq: [route.config.changefreq],
    priority: [route.config.priority],
  };

  sitemap.urlset.url.push(newEntry);

  if (env.DEBUG === '1') {
    console.log(`  - Added new route: ${url}`);
    console.log(`      Frequency: ${route.config.changefreq}`);
    console.log(`      Priority: ${route.config.priority}`);
  }
}

const builder = new Builder({
  renderOpts: {
    pretty: false,
    indent: '',
    newline: '',
  },
  xmldec: { version: '1.0', encoding: 'UTF-8' },
});

const updatedXml = builder.buildObject(sitemap);

await writeFile(sitemapPath, updatedXml);

if (env.DEBUG === '1') {
  Object.entries(changes).forEach(
    ([url, { oldFreq, newFreq, oldPriority, newPriority }]) => {
      if (oldFreq !== newFreq || oldPriority !== newPriority) {
        console.log(`  - ${url}`);

        if (oldFreq !== newFreq) {
          console.log(`      Frequency: ${oldFreq} → ${newFreq}`);
        }

        if (oldPriority !== newPriority) {
          console.log(`      Priority: ${oldPriority} → ${newPriority}`);
        }
      }
    }
  );
}
