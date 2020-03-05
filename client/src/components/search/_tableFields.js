export default [
  {
    _id: 1,
    name: 'name',
    label: 'NAME',
    width: '14rem',
    comparingFunc(a, b) {
      return a.name && b.name ? a.name.localeCompare(b.name) : 0;
    }
  },
  {
    _id: 2,
    name: 'mana_cost',
    label: 'MANA COST',
    width: '8rem',
    comparingFunc(a, b) {
      return a.mana_cost && b.mana_cost ? a.mana_cost.localeCompare(b.mana_cost) : 0;
    }
  },
  {
    _id: 3,
    name: 'type_line',
    label: 'TYPE',
    width: '16rem',
    comparingFunc(a, b) {
      return a.type_line && b.type_line ? a.type_line.localeCompare(b.type_line) : 0;
    }
  },
  {
    _id: 4,
    name: 'rarity',
    label: 'RARITY',
    width: '8rem',
    comparingFunc(a, b) {
      return a.rarity && b.rarity ? a.rarity.localeCompare(b.rarity) : 0;
    }
  },
  {
    _id: 5,
    name: 'power',
    label: 'POWER/\nTOUGHNESS',
    width: '6rem',
    comparingFunc(a, b) {
      return a.power && b.power ? a.power.localeCompare(b.power) : 0;
    }
  },
  {
    _id: 6,
    name: 'artist',
    label: 'ARTIST',
    width: '10rem',
    comparingFunc(a, b) {
      return a.artist && b.artist ? a.artist.localeCompare(b.artist) : 0;
    }
  }
];
