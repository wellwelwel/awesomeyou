import type { categories } from '@site/src/configs/categories';
import { useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import Projects from '@site/src/components/Projects';
import { projects } from '@site/src/helpers/get-contents';

export default () => {
  const include: (keyof typeof categories)[] = ['educational'];

  return (
    <Projects
      title='Educação'
      icon={<GraduationCap />}
      description='Aprenda programação através de repositórios educacionais e abertos para dúvidas através de Issues ou Discussões.'
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
