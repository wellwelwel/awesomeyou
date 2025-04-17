/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { CSSProperties, FC } from 'react';
import { useRef } from 'react';
import { animate } from 'animejs';

type NameOptions = {
  name: string;
  animateStroke?: number[];
};

export const Name: FC<NameOptions> = ({ name, animateStroke }) => {
  const handleMouseEnter = (ref: HTMLSpanElement | null) => {
    if (!ref || !animateStroke) return;

    const from = animateStroke.at(0)!;
    const to = animateStroke.at(-1)!;

    animate(ref, {
      '-webkit-text-stroke-width': animateStroke,
      duration: 500,
      easing: 'inElastic',
      onComplete: () => {
        animate(ref, {
          '-webkit-text-stroke-width': [to, from],
          duration: 250,
          easing: 'outElastic',
        });
      },
    });
  };

  return name.split('').map((char, i) => {
    const ref = useRef<HTMLSpanElement>(null);

    return (
      <span
        key={`name:${char}:${i}`}
        ref={ref}
        style={
          char.trim().length > 0
            ? ({ '--index': i } as CSSProperties)
            : undefined
        }
        onMouseEnter={() => handleMouseEnter(ref.current)}
      >
        {char}
      </span>
    );
  });
};
