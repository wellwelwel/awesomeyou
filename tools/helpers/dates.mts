import type { Stats } from 'node:fs';
import { stat } from 'node:fs/promises';

export const getCurrentDate = () => new Date().toISOString().split('T')[0];

export const getMtimeDate = (fileStats: Stats) =>
  new Date(fileStats.mtime).toISOString().split('T')[0];

export const shouldUpdateFile = async (
  filePath: string,
  days: number = 1
): Promise<boolean> => {
  try {
    const fileStats = await stat(filePath);
    const lastModified = getMtimeDate(fileStats);
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
