/** Stable circular positions: the selected item is always slot 0. */
export function wrapIndex(index: number, count: number) {
  return count > 0 ? ((index % count) + count) % count : 0;
}
export function carouselOffset(index: number, selected: number, count: number) {
  const distance = wrapIndex(index - selected, count);
  return distance > count / 2 ? distance - count : distance;
}
