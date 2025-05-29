/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, it, listFiles, strict } from 'poku';
import { RawProject } from '@site/src/@types/projects';

const require = createRequire(import.meta.url);
const { extractRepository } = require('@site/src/helpers/extract-repository');

const invalidChars = /[^\p{L}\p{N}\s\-.!?_ #@()*&%^:—,/'"’“”~+={}()\[\]\\]/u;

const schemas = [
  {
    schemaPath: './schemas/projects.json',
    path: './static/maintainers/',
    filter: /projects\.json/,
  },
];

for (const { schemaPath, path, filter } of schemas) {
  await describe('', async () => {
    const files = await listFiles(path, {
      filter,
    });

    for (const file of files) {
      const [schema, jsonData] = await Promise.all([
        readFile(resolve(schemaPath), 'utf8').then(JSON.parse),
        readFile(file, 'utf8').then(JSON.parse),
      ]);

      const { $schema, projects } = jsonData as RawProject;

      it(file, () => {
        strict.strictEqual(
          $schema,
          `../../.${schemaPath}`,
          'Ensure schema path'
        );
      });

      it(file, () => {
        strict(Array.isArray(projects), 'Recognize projects');
      });

      for (const project of projects) {
        const { organization, repository } = extractRepository(
          project.repository
        );

        it(file, () => {
          strict.strictEqual(
            project.repository,
            project.repository.trim(),
            `${organization}/${repository}: Ensure repository URL is trimmed`
          );
        });

        it(file, () => {
          strict(
            organization,
            `${organization}/${repository}: Ensure organization name exists`
          );
        });

        it(file, () => {
          strict(
            repository,
            `${organization}/${repository}: Ensure repository name exists`
          );
        });

        it(file, () => {
          strict.doesNotMatch(
            repository,
            /[^a-zA-Z0-9-_.]/,
            `${organization}/${repository}: Ensure repository name only contains valid characters`
          );
        });

        it(file, () => {
          strict(
            project.repository.startsWith('https://github.com/'),
            `${organization}/${repository}: Ensure repository is on GitHub`
          );
        });

        it(file, () => {
          strict.doesNotMatch(
            project.repository,
            /#|\?/,
            `${organization}/${repository}: Ensure repository URL`
          );
        });

        it(file, () => {
          strict(
            project.description.length <= 250,
            `${organization}/${repository}: Ensure description length: (${project.description.length}/250)`
          );
        });

        it(file, () => {
          strict.strictEqual(
            project.description,
            project.description.trim(),
            `${organization}/${repository}: Ensure project description is trimmed`
          );
        });

        if (project.name) {
          const { name } = project;

          it(file, () => {
            strict(
              name.length <= 50,
              `${organization}/${repository}: Ensure name length (${name.length}/50)`
            );
          });

          it(file, () => {
            strict.doesNotMatch(
              name,
              invalidChars,
              `${organization}/${repository}: Ensure project name does not contain emojis or symbols`
            );
          });

          it(file, () => {
            strict.strictEqual(
              name,
              name.trim(),
              `${organization}/${repository}: Ensure project name is trimmed`
            );
          });
        }

        if (project.message) {
          const { message } = project;
          it(file, () => {
            strict(
              message.length <= 120,
              `${organization}/${repository}: Ensure message (CTA) length (${message.length}/120)`
            );
          });

          it(file, () => {
            strict.strictEqual(
              message,
              message.trim(),
              `${organization}/${repository}: Ensure project description is trimmed`
            );
          });
        }

        if (Array.isArray(project.languages)) {
          const { languages } = project;

          it(file, () => {
            strict(
              languages.length > 0 && languages.length <= 2,
              `${organization}/${repository}: Ensure languages size (${languages.length}/2)`
            );
          });
        }

        if (Array.isArray(project.categories)) {
          const { categories } = project;

          it(file, () => {
            strict(
              categories.length > 0 && categories.length <= 4,
              `${organization}/${repository}: Ensure categories size (${categories.length}/4)`
            );
          });
        }
      }

      const ajv = new Ajv({ allErrors: true });

      addFormats(ajv);

      const validate = ajv.compile(schema);

      strict(
        validate(jsonData),
        `Ensure options for "${file}": ${validate.errors ? JSON.stringify(validate.errors, null, 2) : ''}`
      );
    }
  });
}
