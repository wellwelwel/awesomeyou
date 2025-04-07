/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { readFile } from 'node:fs/promises';

export const getCurrentDate = () => new Date().toISOString().split('T')[0];

export const shouldUpdateFile = async (
  filePath: string,
  days: number = 1
): Promise<boolean> => {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    if (!data || typeof data !== 'object') return true;
    if (!data?.updatedAt) return true;

    const lastModified = new Date(data.updatedAt).toISOString().split('T')[0];
    const currentDate = getCurrentDate();

    const isOlder = (date: string, days: number): boolean => {
      const lastModifiedDate = new Date(date);
      const currentDateObj = new Date(currentDate);
      const diffInTime = currentDateObj.getTime() - lastModifiedDate.getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

      return diffInDays > days;
    };

    return isOlder(lastModified, days);
  } catch {
    return true;
  }
};
