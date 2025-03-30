import type { FC } from 'react';
import { useContext } from 'react';
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
import { FAQ } from '@site/src/components/FAQ';
import { SafeLink } from '@site/src/components/SafeLink';
import { Context } from '@site/src/contexts/New';
import { extractRepository } from '@site/src/helpers/extract-repository';

export const Instructions: FC = () => {
  const { useMaintainer, useJSON } = useContext(Context);
  const [maintainer] = useMaintainer;
  const [json] = useJSON;

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
              content/maintainers/<ins>{maintainer}</ins>/projects.json
            </code>{' '}
            e cole o conteúdo a seguir:
            <CodeBlock
              language='json'
              title={`content/maintainers/${maintainer}/projects.json`}
            >
              {`${JSON.stringify(json, null, 2)}\n\n`}
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
            Abra uma <strong>Pull Request</strong> com o título "
            <strong>
              docs: add{' '}
              {json?.projects?.[0]?.name ||
                (() => {
                  try {
                    return extractRepository(json.projects[0].repository)
                      .repository;
                  } catch (error) {
                    return '***';
                  }
                })()}
            </strong>
            ".
          </span>
        </div>
        <div>
          <HousePlus />
          <span>
            Fique à vontade para falar do seu projeto e conversar em português.
          </span>
        </div>
      </small>
    </FAQ>
  );
};
