/**
 * Fisher-Yates is a shuffling algorithm that guarantees an impartial random order.
 * The algorithm efficiently goes through the list swapping each item for another random item.
 */
export const randomize = <T>(list: T[]): T[] => {
  const listLength = list.length - 1;

  for (let current = listLength; current > 0; current--) {
    const random = Math.floor(Math.random() * (current + 1));

    [list[current], list[random]] = [list[random], list[current]];
  }

  return list;
};
