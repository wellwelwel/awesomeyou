import type { FC } from 'react';
import { useContext } from 'react';
import { Fingerprint, Github, MapPin, Network, Quote } from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { Context } from '@site/src/contexts/Maintainer';

export const Header: FC = () => {
  const { title, description, maintainer } = useContext(Context);
  const { name, username, blog, bio, location } = maintainer;

  return (
    <header>
      <h1 aria-label={title}>
        Quem é{' '}
        <ins>
          <Name name={name} />
        </ins>
        ? <img src={'/img/hi.gif'} loading='lazy' />
      </h1>
      <small className='quoted'>
        <Quote /> <span>{description}</span>
      </small>
      <small className='baloon'>
        <div className='float'>
          <Fingerprint />
        </div>
        <span>
          <img
            src={`https://avatars.githubusercontent.com/${username}`}
            loading='eager'
            alt={`${username} profile avatar`}
          />
          <span>
            <p className='name'>{name}</p>
            <p>{bio}</p>
          </span>
        </span>
        <footer>
          <div className='links'>
            {' '}
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
