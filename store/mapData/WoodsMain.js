import img from '../../mapImages/WoodsMain.webp';

const mapData = {
  groupId: "woods",
  groupName: {
    en: "Woods",
    ru: "Лес "
  },
  title: {
    en: "Main",
    ru: "Главная"
  },
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "Gate To Factory",
        ru: "Заводские ворота"
      },
      faction: "all",
      specialConditions: "??? выйти можно только парой ЧВК + дикий",
      coords: { x: 322, y: 213 }
    },
    {
      id: "ext-2",
      names: {
        en: "Outskirts",
        ru: "Окраина"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1342, y: 196 }
    },
    {
      id: "ext-3",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "pmc",
      specialConditions: "??? когда есть зеленый дым",
      coords: { x: 644, y: 76 }
    },
    {
      id: "ext-4",
      names: {
        en: "South V-Ex",
        ru: "Южный А-Выход"
      },
      faction: "all",
      specialConditions: "??? 3000 руб, одноразовый",
      coords: { x: 778, y: 1006 }
    },
    {
      id: "ext-5",
      names: {
        en: "UN Roadblock",
        ru: "Блокпост ООН"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 73, y: 270 }
    },
    {
      id: "ext-6",
      names: {
        en: "ZB-014",
        ru: "ЗБ-014"
      },
      faction: "all",
      specialConditions: "??? когда есть зеленый дым, нужен ключ ЗБ-014",
      coords: { x: 1478, y: 583 }
    },
    {
      id: "ext-7",
      names: {
        en: "Cliff descent",
        ru: "Спуск с горы"
      },
      faction: "pmc",
      specialConditions: "??? нужен ледоруб и паракорд",
      coords: { x: 542, y: 988 }
    },
    {
      id: "ext-8",
      names: {
        en: "ZB-016",
        ru: "ЗБ-016"
      },
      faction: "pmc",
      specialConditions: "??? когда есть зеленый дым",
      coords: { x: 266, y: 657 }
    },
    {
      id: "ext-9",
      names: {
        en: "Dead Man's Place",
        ru: "У мертвеца"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1125, y: 317 }
    },
    {
      id: "ext-10",
      names: {
        en: "East Gate",
        ru: "Восточные ворота"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1422, y: 747 }
    },
    {
      id: "ext-11",
      names: {
        en: "Mountain Stash",
        ru: "Горный тайник"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 547, y: 992 }
    },
    {
      id: "ext-12",
      names: {
        en: "Old Station",
        ru: "Старая станция"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 96, y: 468 }
    },
    {
      id: "ext-13",
      names: {
        en: "Outskirts Water",
        ru: "Окраина Озера"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1153, y: 228 }
    },
    {
      id: "ext-14",
      names: {
        en: "Scav House",
        ru: "Дом диких"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1448, y: 349 }
    },
    {
      id: "ext-15",
      names: {
        en: "The Boat",
        ru: "Лодка"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1103, y: 375 }
    },
    {
      id: "ext-16",
      names: {
        en: "West Border",
        ru: "Западная граница"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 132, y: 754 }
    },
    {
      id: "ext-17",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 642, y: 85 }
    },
  ]
};

export default mapData;