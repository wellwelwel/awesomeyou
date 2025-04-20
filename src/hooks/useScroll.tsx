/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { RefObject } from 'react';
import { useEffect } from 'react';

type Options = {
  eject?: boolean;
  threshold?: number;
};

export function useScroll(
  ref: RefObject<HTMLElement | null>,
  cb: (isVisible: boolean, target: HTMLElement) => void,
  options?: Options
) {
  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const { threshold = 0.1, eject = true } = options ?? Object.create(null);

    const observer = new IntersectionObserver(
      ([entry]) => {
        cb(entry.isIntersecting, target);

        if (entry.isIntersecting && eject) observer.unobserve(target);
      },
      { threshold }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
