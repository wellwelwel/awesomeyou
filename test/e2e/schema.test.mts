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
    path: './content/maintainers/',
    filter: /projects\.json/,
  },
];

for (const { schemaPath, path, filter } of schemas) {
  await describe('', async () => {
    const files = await listFiles(path, {
      filter,
    });

    for (const file of files) {
      await it(file, async () => {
        const [schema, jsonData] = await Promise.all([
          readFile(resolve(schemaPath), 'utf8').then(JSON.parse),
          readFile(file, 'utf8').then(JSON.parse),
        ]);

        const { $schema, projects } = jsonData as RawProject;

        strict.strictEqual(
          $schema,
          `../../.${schemaPath}`,
          'Ensure schema path'
        );

        strict(Array.isArray(projects), 'Recognize projects');

        for (const project of projects) {
          const { organization, repository } = extractRepository(
            project.repository
          );

          strict.strictEqual(
            project.repository,
            project.repository.trim(),
            `${organization}/${repository}: Ensure repository URL is trimmed`
          );

          strict(
            organization,
            `${organization}/${repository}: Ensure organization name exists`
          );

          strict(
            repository,
            `${organization}/${repository}: Ensure repository name exists`
          );

          strict.doesNotMatch(
            repository,
            /[^a-zA-Z0-9-_.]/,
            `${organization}/${repository}: Ensure repository name only contains valid characters`
          );

          strict(
            project.repository.startsWith('https://github.com/'),
            `${organization}/${repository}: Ensure repository is on GitHub`
          );

          strict.doesNotMatch(
            project.repository,
            /#|\?/,
            `${organization}/${repository}: Ensure repository URL`
          );

          strict(
            project.description.length <= 200,
            `${organization}/${repository}: Ensure description length: (${project.description.length}/200)`
          );

          strict.doesNotMatch(
            project.description,
            invalidChars,
            `${organization}/${repository}: Ensure project description does not contain emojis or symbols`
          );

          strict.match(
            project.description,
            /(\.|!|\?)$/,
            `${organization}/${repository}: Ensure project description ends with a valid pontuation`
          );

          strict.strictEqual(
            project.description,
            project.description.trim(),
            `${organization}/${repository}: Ensure project description is trimmed`
          );

          if (project.name) {
            strict(
              project.name.length <= 50,
              `${organization}/${repository}: Ensure name length (${project.name.length}/50)`
            );

            strict.doesNotMatch(
              project.name,
              invalidChars,
              `${organization}/${repository}: Ensure project name does not contain emojis or symbols`
            );

            strict.strictEqual(
              project.name,
              project.name.trim(),
              `${organization}/${repository}: Ensure project name is trimmed`
            );
          }

          if (project.message) {
            strict(
              project.message.length <= 120,
              `${organization}/${repository}: Ensure message (CTA) length (${project.message.length}/120)`
            );

            strict.strictEqual(
              project.message,
              project.message.trim(),
              `${organization}/${repository}: Ensure project description is trimmed`
            );
          }

          if (Array.isArray(project.languages))
            strict(
              project.languages.length > 0 && project.languages.length <= 2,
              `${organization}/${repository}: Ensure languages size (${project.languages.length}/2)`
            );

          if (Array.isArray(project.categories))
            strict(
              project.categories.length > 0 && project.categories.length <= 4,
              `${organization}/${repository}: Ensure categories size (${project.categories.length}/4)`
            );
        }

        const ajv = new Ajv({ allErrors: true });

        addFormats(ajv);

        const validate = ajv.compile(schema);

        strict(
          validate(jsonData),
          `Ensure options for "${file}": ${validate.errors ? JSON.stringify(validate.errors, null, 2) : ''}`
        );
      });
    }
  });
}
