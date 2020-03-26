export default [
  {
    _id: 1,
    name: 'name',
    label: 'name',
    cellWidth: '14em',
    compare(a, b) {
      return a.name ? a.name.localeCompare(b.name) : 0;
    }
  },
  {
    _id: 2,
    name: 'mana_cost',
    label: 'mana cost',
    cellWidth: '8em',
    compare(a, b) {
      return a.cmc === b.cmc
        ? a.mana_cost
          ? a.mana_cost.localeCompare(b.mana_cost)
          : 0
        : a.cmc - b.cmc;
    }
  },
  {
    _id: 3,
    name: 'type_line',
    label: 'type',
    cellWidth: '16em',
    compare(a, b) {
      return a.type_line ? a.type_line.localeCompare(b.type_line) : 0;
    }
  },
  {
    _id: 4,
    name: 'rarity',
    label: 'rarity',
    cellWidth: '8em',
    compare(a, b) {
      const weight = { common: 0, uncommon: 1, rare: 2, mythic: 3 };
      return a.rarity && b.rarity ? weight[a.rarity] - weight[b.rarity] : 0;
    }
  },
  {
    _id: 5,
    name: 'power',
    label: 'power/\ntoughness',
    cellWidth: '6em',
    compare(a, b) {
      return a.power
        ? a.power === b.power
          ? a.toughness.localeCompare(b.toughness)
          : a.power.localeCompare(b.power)
        : 0;
    }
  },
  {
    _id: 6,
    name: 'artist',
    label: 'artist',
    cellWidth: '10em',
    compare(a, b) {
      return a.artist ? a.artist.localeCompare(b.artist) : 0;
    }
  }
];
