const list = new Intl.ListFormat('pt-BR', {
  style: 'long',
  type: 'conjunction',
});

export const format = {
  list: list.format.bind(list),
};
