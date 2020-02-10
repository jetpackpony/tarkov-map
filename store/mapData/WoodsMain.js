import img from '../../mapImages/WoodsMain.webp';

const mapData = {
  groupName: "Лес / Woods",
  title: "Главная",
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
      coords: { x: 380, y: 200 }
    },
    {
      id: "ext-2",
      names: {
        en: "Outskirts",
        ru: "Окраина"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1610, y: 230 }
    },
    {
      id: "ext-3",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "pmc",
      specialConditions: "??? когда есть зеленый дым",
      coords: { x: 710, y: 150 }
    },
    {
      id: "ext-4",
      names: {
        en: "South V-Ex",
        ru: "Южный А-Выход"
      },
      faction: "all",
      specialConditions: "??? 3000 руб, одноразовый",
      coords: { x: 930, y: 1205 }
    },
    {
      id: "ext-5",
      names: {
        en: "UN Roadblock",
        ru: "Блокпост ООН"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 90, y: 335 }
    },
    {
      id: "ext-6",
      names: {
        en: "ZB-014",
        ru: "ЗБ-014"
      },
      faction: "all",
      specialConditions: "??? когда есть зеленый дым, нужен ключ ЗБ-014",
      coords: { x: 1775, y: 700 }
    },
    {
      id: "ext-7",
      names: {
        en: "Cliff descent",
        ru: "Спуск с горы"
      },
      faction: "pmc",
      specialConditions: "??? нужен ледоруб и паракорд",
      coords: { x: 650, y: 1190 }
    },
    {
      id: "ext-8",
      names: {
        en: "ZB-016",
        ru: "ЗБ-016"
      },
      faction: "pmc",
      specialConditions: "??? когда есть зеленый дым",
      coords: { x: 320, y: 785 }
    },
    {
      id: "ext-9",
      names: {
        en: "Dead Man's Place",
        ru: "У мертвеца"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1345, y: 375 }
    },
    {
      id: "ext-10",
      names: {
        en: "East Gate",
        ru: "Восточные ворота"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1705, y: 890 }
    },
    {
      id: "ext-11",
      names: {
        en: "Mountain Stash",
        ru: "Горный тайник"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 650, y: 1190 }
    },
    {
      id: "ext-12",
      names: {
        en: "Old Station",
        ru: "Старая станция"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 115, y: 560 }
    },
    {
      id: "ext-13",
      names: {
        en: "Outskirts Water",
        ru: "Окраина Озера"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1385, y: 275 }
    },
    {
      id: "ext-14",
      names: {
        en: "Scav House",
        ru: "Дом диких"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1735, y: 415 }
    },
    {
      id: "ext-15",
      names: {
        en: "The Boat",
        ru: "Лодка"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1325, y: 450 }
    },
    {
      id: "ext-16",
      names: {
        en: "West Border",
        ru: "Западная граница"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 155, y: 900 }
    },
    {
      id: "ext-17",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 710, y: 150 }
    },
  ]
};

export default mapData;