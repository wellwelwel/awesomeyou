import { FC, ReactNode } from 'react';
import Details from '@theme/Details';

export type FAQProps = {
  children: ReactNode;
  open?: boolean;
  title: ReactNode;
};

/**
 * Usage example:
 *
 * ```mdx
 * <FAQ title='Title'>
 *
 * > Some markdown (**MDX**) content.
 *
 * </FAQ>
 * ```
 */
export const FAQ: FC<FAQProps> = ({ children, open, title }) => {
  return (
    <Details
      open={open}
      className='faq'
      summary={
        <summary>
          <h2>{title}</h2>
        </summary>
      }
    >
      <section>{children}</section>
    </Details>
  );
};
