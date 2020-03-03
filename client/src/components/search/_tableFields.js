export default [
  {
    _id: 1,
    name: 'name',
    label: 'NAME',
    comparingFunc(a, b) {
      return a.localeCompare(b);
    }
  },
  {
    _id: 2,
    name: 'mana_cost',
    label: 'MANA COST',
    comparingFunc(a, b) {
      return a.localeCompare(b);
    }
  },
  {
    _id: 3,
    name: 'type_line',
    label: 'TYPE',
    comparingFunc(a, b) {
      return a.localeCompare(b);
    }
  },
  {
    _id: 4,
    name: 'rarity',
    label: 'RARITY',
    comparingFunc(a, b) {
      return a.localeCompare(b);
    }
  },
  {
    _id: 5,
    name: 'power',
    label: 'POWER/TOUGHNESS',
    comparingFunc(a, b) {
      return a.localeCompare(b);
    }
  },
  {
    _id: 6,
    name: 'artist',
    label: 'ARTIST',
    comparingFunc(a, b) {
      return a.localeCompare(b);
    }
  }
];
