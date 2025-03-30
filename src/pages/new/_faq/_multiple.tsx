import type { FC } from 'react';
import { Bot, GitPullRequestCreateArrow, UsersRound } from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';

export const Multiple: FC = () => {
  return (
    <FAQ
      title={
        <>
          <UsersRound /> Como cadastrar múltiplas pessoas no mesmo projeto?
        </>
      }
    >
      <small>
        <div>
          <GitPullRequestCreateArrow />
          <span>
            Cada pessoa deve ser cadastrada individualmente, cada uma em um{' '}
            <em>Pull Request</em> próprio.
          </span>
        </div>
        <div>
          <Bot />
          <span>
            O sistema associa múltiplas pessoas automaticamente em projetos já
            cadastrados.
          </span>
        </div>
      </small>
    </FAQ>
  );
};
