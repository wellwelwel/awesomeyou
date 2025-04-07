/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import {
  FileCode2,
  GitBranchPlus,
  GitGraph,
  GitPullRequestCreateArrow,
  GraduationCap,
  HousePlus,
  PackageCheck,
  Utensils,
  WandSparkles,
} from 'lucide-react';
import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';
import { FAQ } from '@site/src/components/FAQ';
import { SafeLink } from '@site/src/components/SafeLink';
import { Context } from '@site/src/contexts/New';
import { deepTrim } from '@site/src/helpers/deep-trim';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { format } from '@site/src/helpers/formatter';

export const Instructions: FC = () => {
  const { useMaintainer, useJSON } = useContext(Context);
  const [maintainer] = useMaintainer;
  const [json] = useJSON;
  const [formattedJSON, setFormattedJSON] = useState('');
  const useS = json?.projects?.length > 0 ? 's' : '';

  const formatJSON = useCallback(async () => {
    if (!json?.$schema) return;

    try {
      const cleaned = JSON.stringify(deepTrim(json));

      const formatted = await prettier.format(`(${cleaned})`, {
        parser: 'json',
        plugins: [babelPlugin, estreePlugin],
        // same as .prettierrc file
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always',
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        endOfLine: 'auto',
        embeddedLanguageFormatting: 'auto',
        singleAttributePerLine: false,
      });

      setFormattedJSON(
        formatted
          .trim()
          .replace(/^\(\|\);$/g, '')
          .trim()
      );
    } catch (error) {
      setFormattedJSON(JSON.stringify(json, null, 2));
    }
  }, [setFormattedJSON, json]);

  useEffect(() => {
    formatJSON();
  }, [formatJSON, json]);

  return (
    <FAQ
      open
      title={
        <>
          <GraduationCap /> Instruções
        </>
      }
    >
      <small>
        <div>
          <Utensils />
          <span>
            Faça um{' '}
            <strong>
              <SafeLink to='https://github.com/wellwelwel/awesomeyou/fork'>
                fork do repositório <ins>awesomeyou</ins>
              </SafeLink>
            </strong>
            .
          </span>
        </div>
        <div>
          <GitBranchPlus />
          <span>
            Baixe seu <em>fork</em> localmente e crie uma nova <em>branch</em>.
          </span>
        </div>
        <div>
          <FileCode2 />
          <span>
            Crie o arquivo{' '}
            <code>
              static/maintainers/<ins>{maintainer || '***'}</ins>/projects.json
            </code>{' '}
            e cole o conteúdo a seguir:
            <CodeBlock
              language='json'
              title={`static/maintainers/${maintainer || '***'}/projects.json`}
            >
              {`${formattedJSON}\n\n`}
            </CodeBlock>
          </span>
        </div>
        <div>
          <PackageCheck />
          <span>
            Instale as dependências do projeto com o comando <code>npm ci</code>{' '}
            (opcional).
          </span>
        </div>
        <div>
          <WandSparkles />
          <span>
            Aplique a formatação com o comando <code>npm run lint:fix</code>{' '}
            (opcional).
          </span>
        </div>
        <div>
          <GitGraph />
          <span>
            Crie o <em>commit</em> com suas modificações.
          </span>
        </div>
        <div>
          <GitPullRequestCreateArrow />
          <span>
            Abra uma <strong>Pull Request</strong> com o título:{' '}
            <code>
              <strong>
                feat: add{' '}
                {json?.projects?.length > 0
                  ? format.listEn(
                      json.projects.map((project) => {
                        if (project.name) return project.name;

                        try {
                          const { repository } = extractRepository(
                            project.repository
                          );
                          return repository;
                        } catch (error) {
                          return '***';
                        }
                      })
                    )
                  : '***'}
              </strong>
            </code>
            .
          </span>
        </div>
        <div>
          <HousePlus />
          <span>
            Aproveite o espaço para falar do
            {useS} projeto{useS} e conversar em português com a gente.
          </span>
        </div>
      </small>
    </FAQ>
  );
};
