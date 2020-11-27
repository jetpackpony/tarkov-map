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
      specialConditions: {
        en: "??? you need to be a scav + pmc team to extract",
        ru: "??? нужна пара ЧВК + Дикий чтобы выйти"
      },
      coords: {x: 587, y: 247}
    },
    {
      id: "ext-2",
      names: {
        en: "Outskirts",
        ru: "Окраина"
      },
      faction: "all",
      specialConditions: null,
      coords:  {x: 2731, y: 247}
    },
    {
      id: "ext-3",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? if there is green smoke",
        ru: "??? когда горит зеленая дымовая шашка"
      },
      coords: {x: 1274, y: 66}
    },
    {
      id: "ext-4",
      names: {
        en: "South V-Ex",
        ru: "Южный А-Выход"
      },
      faction: "all",
      specialConditions: {
        en: "??? 3000 Rub, need to wait for 1 min., 1 time use",
        ru: "??? 3000 Руб, ждать 1 минуту, одноразовый"
      },
      coords: {x: 1551, y: 2018}
    },
    {
      id: "ext-5",
      names: {
        en: "UN Roadblock",
        ru: "Блокпост ООН"
      },
      faction: "all",
      specialConditions: null,
      coords: {x: 77, y: 464}
    },
    {
      id: "ext-6",
      names: {
        en: "ZB-014",
        ru: "ЗБ-014"
      },
      faction: "all",
      specialConditions: {
        en: "??? if there is green smoke. Need a ZB-014 key",
        ru: "??? когда горит зеленая дымовая шашка, нужен ключ ЗБ-014"
      },
      coords: {x: 3010, y: 1126}
    },
    {
      id: "ext-7",
      names: {
        en: "Cliff descent",
        ru: "Спуск с горы"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? you need RR icepick and paracord",
        ru: "??? нужен ледоруб и паракорд"
      },
      coords: {x: 1089, y: 1983}
    },
    {
      id: "ext-8",
      names: {
        en: "ZB-016",
        ru: "ЗБ-016"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? if there is green smoke",
        ru: "??? когда горит зеленая дымовая шашка"
      },
      coords: {x: 478, y: 1264}
    },
    {
      id: "ext-9",
      names: {
        en: "Dead Man's Place",
        ru: "У мертвеца"
      },
      faction: "scav",
      specialConditions: null,
      coords:  {x: 2253, y: 582}
    },
    {
      id: "ext-10",
      names: {
        en: "East Gate",
        ru: "Восточные ворота"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 2894, y: 1467}
    },
    {
      id: "ext-11",
      names: {
        en: "Mountain Stash",
        ru: "Горный тайник"
      },
      faction: "scav",
      specialConditions: null,
      coords:  {x: 1043, y: 1985}
    },
    {
      id: "ext-12",
      names: {
        en: "Old Station",
        ru: "Старая станция"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 128, y: 893}
    },
    {
      id: "ext-13",
      names: {
        en: "Outskirts Water",
        ru: "Окраина Озера"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 2338, y: 368}
    },
    {
      id: "ext-14",
      names: {
        en: "Scav House",
        ru: "Дом диких"
      },
      faction: "scav",
      specialConditions: null,
      coords:  {x: 2925, y: 611}
    },
    {
      id: "ext-15",
      names: {
        en: "The Boat",
        ru: "Лодка"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 2210, y: 688}
    },
    {
      id: "ext-16",
      names: {
        en: "West Border",
        ru: "Западная граница"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 197, y: 1492}
    },
    {
      id: "ext-17",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1270, y: 82}
    },
  ]
};

export default mapData;