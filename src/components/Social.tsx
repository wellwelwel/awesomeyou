import type { FC, ReactNode } from 'react';
import { SafeLink } from '@site/src/components/SafeLink';

export type SocialOptions = {
  imageSrc: string;
  name: string;
  url: string;
  description?: ReactNode;
};

export const Social: FC<SocialOptions> = ({
  name,
  imageSrc,
  url,
  description,
}) => (
  <>
    <SafeLink to={url}>
      <img loading='lazy' src={imageSrc} alt={name} />
    </SafeLink>
    {name && description ? (
      <span className='description'>
        <h3>
          <img loading='lazy' src={imageSrc} alt={name} /> {name}
        </h3>
        {description}
      </span>
    ) : null}
  </>
);
