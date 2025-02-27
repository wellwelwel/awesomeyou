import type { FC } from 'react';

export type NameOptions = {
  name: string;
};

export const Name: FC<NameOptions> = ({ name }) =>
  name.split('').map((char, i) => (
    <span
      key={`name:${char}:${i}`}
      style={
        char.trim().length > 0
          ? ({ '--index': i } as React.CSSProperties)
          : undefined
      }
    >
      {char}
    </span>
  ));
