export function findIndexById(id: string, tab: any[]): number {
  let index = -1;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
}
