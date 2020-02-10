import img from '../../mapImages/FactoryMain.webp';

const mapData = {
  groupName: "Завод / Factory",
  title: "Главная",
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "Gate 0",
        ru: "Ворота 0"
      },
      faction: "all",
      specialConditions: "??? нужен Ключ от выхода с завода",
      coords: { x: 246, y: 881 }
    },
    {
      id: "ext-2",
      names: {
        en: "Gate 3",
        ru: "Ворота 3"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 187, y: 107 }
    },
    {
      id: "ext-3",
      names: {
        en: "Cellars (Underground)",
        ru: "Подвал"
      },
      faction: "pmc",
      specialConditions: "??? нужен Ключ от выхода с завода",
      coords: { x: 816, y: 62 }
    },
    {
      id: "ext-4",
      names: {
        en: "Camera Bunker Door (Underground)",
        ru: "Бункерная дверь с Камерой"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 457, y: 625 }
    },
    {
      id: "ext-5",
      names: {
        en: "Office Window",
        ru: "Офисное окно"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 878, y: 672 }
    },
  ]
};

export default mapData;