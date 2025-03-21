import type { categories } from '@site/src/configs/categories';
import { useMemo } from 'react';
import { List } from 'lucide-react';
import Projects from '@site/src/components/Projects';
import { projects } from '@site/src/helpers/get-contents';

export default () => {
  const include: (keyof typeof categories)[] = ['list'];

  return (
    <Projects
      title='Listas'
      icon={<List />}
      description='Por que parar por aqui, quando podemos incluir e conhecer novos projetos em diversas listas criadas por brasileiros?'
      projects={useMemo(
        () =>
          projects({
            include,
          }),
        []
      )}
      excludeFilters={include}
    />
  );
};
