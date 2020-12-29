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
      coords: {x: 2280, y: 3255}
    },
    {
      id: "ext-2",
      names: {
        en: "Outskirts",
        ru: "Окраина"
      },
      faction: "all",
      specialConditions: null,
      coords:  {x: 410, y: 3256}
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
      coords: {x: 1678, y: 3410}
    },
    {
      id: "ext-4",
      names: {
        en: "Bridge extraction",
        ru: "Мост"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? 3000 Rub, need to wait for 1 min., 1 time use",
        ru: "??? 3000 Руб, ждать 1 минуту, одноразовый"
      },
      coords: {x: 2609, y: 1120}
    },
    {
      id: "ext-5",
      names: {
        en: "UN Roadblock",
        ru: "Блокпост ООН"
      },
      faction: "all",
      specialConditions: null,
      coords: {x: 2715, y: 3075}
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
      coords: {x: 326, y: 2437}
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
      coords: {x: 1796, y: 1764}
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
      coords: {x: 2365, y: 2378}
    },
    {
      id: "ext-9",
      names: {
        en: "Dead Man's Place",
        ru: "У мертвеца"
      },
      faction: "scav",
      specialConditions: null,
      coords:  {x: 825, y: 2980}
    },
    {
      id: "ext-10",
      names: {
        en: "Scav Bunker",
        ru: "Бункер диких"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 743, y: 603}
    },
    {
      id: "ext-11",
      names: {
        en: "Mountain Stash",
        ru: "Горный тайник"
      },
      faction: "scav",
      specialConditions: null,
      coords:  {x: 1795, y: 1775}
    },
    {
      id: "ext-12",
      names: {
        en: "Old Station",
        ru: "Старая станция"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 2699, y: 2705}
    },
    {
      id: "ext-14",
      names: {
        en: "Scav House",
        ru: "Дом диких"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 237, y: 2940}
    },
    {
      id: "ext-15",
      names: {
        en: "The Boat",
        ru: "Лодка"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 860, y: 2877}
    },
    {
      id: "ext-16",
      names: {
        en: "Scav Bridge",
        ru: "Мост диких"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1092, y: 196}
    },
    {
      id: "ext-17",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1678, y: 3410}
    },
    {
      id: "ext-18",
      names: {
        en: "Eastern Rocks",
        ru: "Восточные скалы"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 2704, y: 2269}
    },
    {
      id: "ext-19",
      names: {
        en: "Northern UN Roadblock",
        ru: "Северный блокпост ООН"
      },
      faction: "pmc",
      specialConditions: null,
      coords: {x: 2841, y: 2169}
    },
  ]
};

export default mapData;