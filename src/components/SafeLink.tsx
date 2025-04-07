/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { Props } from '@docusaurus/Link';
import type { FC, ReactNode } from 'react';
import Link from '@docusaurus/Link';

export type SafeLinkOptions = {
  children: ReactNode;
} & Props;

export const normalizeURL = (url: string) =>
  url.replace(/(^http(s)?:\/\/)|\/$/g, '');

/** Use for external links only */
export const SafeLink: FC<SafeLinkOptions> = ({ children, to, ...props }) => (
  <Link target='_blank' rel='noopener' to={to} {...props}>
    {children}
  </Link>
);
