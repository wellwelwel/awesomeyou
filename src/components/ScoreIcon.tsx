/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import {
  Award,
  Flame,
  FlameKindling,
  Sprout,
  Sunrise,
  Trophy,
} from 'lucide-react';

export const ScoreIcon: FC<{ score: number }> = ({ score }) => {
  if (score > 1_000_000) return <Trophy />;
  if (score > 100_000) return <Award />;
  if (score > 10_000) return <Flame />;
  if (score > 1_000) return <FlameKindling />;
  if (score < 200) return <Sunrise />;

  return <Sprout />;
};
