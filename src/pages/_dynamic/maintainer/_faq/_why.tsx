/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import {
  CloudSun,
  Eraser,
  Ghost,
  MessageSquareShare,
  Sprout,
  StarHalf,
} from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';

export const Why: FC = () => {
  return (
    <FAQ
      title={
        <>
          <MessageSquareShare /> Mas afinal, por que apoiar?
        </>
      }
    >
      <small>
        <p>
          <Ghost />
          <span>Já imaginou como seria se o open source não existisse?</span>
        </p>
        <p>
          <Eraser />
          <span>
            Imagine desde linguagens de programação a livrarias que você usa
            desaparecendo ou se tornando pagas.
          </span>
        </p>
        <p>
          <StarHalf />
          <span>
            Às vezes, mesmo uma simples estrela pode colocar um sorriso no rosto
            de quem cria projetos que você usa de graça.
          </span>
        </p>
        <p>
          <Sprout />
          <span>
            Aliás, se fosse você quem criasse um projeto inovador, aposto que
            gostaria que apoiassem seu trabalho, certo?
          </span>
        </p>
        <p>
          <CloudSun />
          <span>
            Apoiar das mais diversas formas quem cria projetos open source,
            motiva o crescimento desse ecossistema incrível.
          </span>
        </p>
      </small>
    </FAQ>
  );
};
