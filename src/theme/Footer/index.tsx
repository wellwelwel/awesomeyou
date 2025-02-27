import type { ReactNode } from 'react';
import { memo } from 'react';
import { SafeLink } from '@site/src/components/SafeLink';

const Footer = (): ReactNode => {
  return (
    <footer>
      <aside className='left'>
        <section>
          <p>
            Este site está sob a licença{' '}
            <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE'>
              <strong className='underline'>
                GNU Affero General Public License v3.0
              </strong>
            </SafeLink>
            .
          </p>
        </section>
      </aside>
      <aside className='right'></aside>
    </footer>
  );
};

export default memo(Footer);
