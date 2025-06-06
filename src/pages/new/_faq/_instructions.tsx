/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import {
  ChevronsLeftRightEllipsis,
  FileCode2,
  GitBranchPlus,
  GitGraph,
  GitPullRequestCreateArrow,
  GraduationCap,
  HousePlus,
  SpellCheck,
  Utensils,
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
  const { useMaintainer, useJSON, useFileExists } = useContext(Context);
  const [maintainer] = useMaintainer;
  const [json] = useJSON;
  const [formattedJSON, setFormattedJSON] = useState('');
  const useS = json?.projects?.length > 1 ? 's' : '';
  const [fileExists] = useFileExists;

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
          <ChevronsLeftRightEllipsis />
          <span>
            Acesse seu fork no <strong>GitHub</strong> e abra o editor online{' '}
            pressionando a tecla <kbd>.</kbd> no teclado.
          </span>
        </div>
        <div>
          <GitBranchPlus />
          <span>
            Crie uma nova <em>branch</em> (opcional).
          </span>
        </div>
        <div>
          <FileCode2 />
          <span>
            {fileExists ? 'Edite' : 'Crie'} o arquivo{' '}
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
          <SpellCheck />
          <span>
            Caso tenha problemas com o <em>Linter</em>, instale a extensão do{' '}
            <strong>Prettier</strong> no editor online do{' '}
            <strong>GitHub</strong> e salve o arquivo novamente para aplicar a
            formatação automaticamente.
          </span>
        </div>
        <div>
          <GitGraph />
          <span>
            Realize o <em>commit</em> com suas modificações diretamente no
            editor online.
          </span>
        </div>
        <div>
          <GitPullRequestCreateArrow />
          <span>
            Abra uma <strong>Pull Request</strong> com o título:{' '}
            <code>
              <strong>
                feat({maintainer || '***'}): add{' '}
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
            , por exemplo.
          </span>
        </div>
        <div>
          <HousePlus />
          <span>
            Aproveite o espaço da <strong>Pull Request</strong> para falar do
            {useS} projeto{useS} adicionado{useS} e conversar em português com a
            gente.
          </span>
        </div>
      </small>
    </FAQ>
  );
};
