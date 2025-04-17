/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useContext } from 'react';
import { Fingerprint, Github, MapPin, Network, Quote } from 'lucide-react';
import { toast } from 'sonner';
import { Name } from '@site/src/components/Name';
import { Parallax } from '@site/src/components/Parallax';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { Context } from '@site/src/contexts/Maintainer';

export const Header: FC = () => {
  const { title, description, maintainer } = useContext(Context);
  const { name, username, blog, bio, location } = maintainer;

  const egg = () => {
    toast.info('Deixe sua Impressão ☝️', {
      duration: 6000,
      description:
        'Ao deixar uma estrela em um repositório, você aparece no feed de quem criou o projeto.',
    });
  };

  return (
    <header>
      <h1 aria-label={title}>
        Quem é{' '}
        <ins>
          <Name name={name} animateStroke={[0, 1.5, 1.25]} />
        </ins>
        ? <img src={'/assets/img/hi.gif'} loading='lazy' />
      </h1>
      <small className='quoted'>
        <Quote /> <span>{description}</span>
      </small>
      <small className='baloon'>
        <span>
          <Parallax scale={1.02} tiltMaxAngleX={2.5} tiltMaxAngleY={2.5}>
            <div className='float egg' onClick={egg}>
              <Fingerprint />
            </div>
            <img
              src={`https://avatars.githubusercontent.com/${username}`}
              loading='eager'
              alt={`${username} profile avatar`}
            />
          </Parallax>
          <span>
            <p className='name'>{<Name name={name} />}</p>
            {bio && <p>{bio}</p>}
          </span>
        </span>
        <footer>
          <div className='links'>
            <SafeLink to={`https://github.com/${username}`}>
              <Github />
              {username}
            </SafeLink>
            {blog ? (
              <SafeLink to={`https://${normalizeURL(blog)}`}>
                <Network />
                {normalizeURL(blog)}
              </SafeLink>
            ) : null}
          </div>
          {location ? (
            <div>
              <MapPin /> {location}
            </div>
          ) : null}
        </footer>
      </small>
    </header>
  );
};
