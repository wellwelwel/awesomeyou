import { useMemo } from 'react';
import Projects from '@site/src/components/Projects';
import { projects } from '@site/src/helpers/get-contents';

export default () => (
  <Projects
    title='Projetos'
    description='Conheça novos projetos criados e mantidos por brasileiros toda vez que voltar aqui.'
    projects={useMemo(
      () =>
        projects({
          exclude: ['list', 'educational'],
        }),
      []
    )}
  />
);
