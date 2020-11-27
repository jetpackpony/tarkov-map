import img from '../../mapImages/Factory3D.webp';

const mapData = {
  groupId: "factory",
  groupName: {
    en: "Factory",
    ru: "Завод"
  },
  title: {
    en: "3D",
    ru: "3Д"
  },
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "Gate 0",
        ru: "Ворота 0"
      },
      faction: "all",
      specialConditions: {
        en: "??? Factory exit key is needed",
        ru: "??? нужен Ключ от выхода с завода"
      },
      coords: {x: 1153, y: 71}
    },
    {
      id: "ext-2",
      names: {
        en: "Gate 3",
        ru: "Ворота 3"
      },
      faction: "all",
      specialConditions: null,
      coords:  {x: 2306, y: 595}
    },
    {
      id: "ext-3",
      names: {
        en: "Cellars (Underground)",
        ru: "Подвал"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? Factory exit key is needed",
        ru: "??? нужен Ключ от выхода с завода"
      },
      coords: {x: 1136, y: 1391}
    },
    {
      id: "ext-4",
      names: {
        en: "Camera Bunker Door (Underground)",
        ru: "Бункерная дверь с Камерой"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 739, y: 447}
    },
    {
      id: "ext-5",
      names: {
        en: "Office Window",
        ru: "Офисное окно"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1790, y: 521}
    },
  ]
};

export default mapData;