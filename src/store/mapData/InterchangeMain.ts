import img from '../../mapImages/InterchangeMain.webp';

const mapData = {
  groupId: "interchange",
  groupName: {
    en: "Interchange",
    ru: "Развязка"
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
        en: "Railway Exfil",
        ru: "Выход на железной дороге"
      },
      faction: "all",
      specialConditions: null,
      coords: {x: 195, y: 217}
    },
    {
      id: "ext-2",
      names: {
        en: "Emercom Checkpoint",
        ru: "КПП МЧС"
      },
      faction: "all",
      specialConditions: null,
      coords:  {x: 895, y: 925}
    },
    {
      id: "ext-3",
      names: {
        en: "Power Station",
        ru: "ТЭЦ"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? 3000 Rub, 1 time use",
        ru: "??? 3000 руб, одноразовый"
      },
      coords: {x: 817, y: 310}
    },
    {
      id: "ext-4",
      names: {
        en: "Hole in fence",
        ru: "Дыра в заборе"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? only without a backpack",
        ru: "??? только без рюкзака"
      },
      coords: {x: 792, y: 606}
    },
    {
      id: "ext-5",
      names: {
        en: "Scav camp",
        ru: "Лагерь диких"
      },
      faction: "all",
      specialConditions: {
        en: "??? you need to be a scav + pmc team to extract",
        ru: "??? нужна пара ЧВК + Дикий чтобы выйти"
      },
      coords: {x: 335, y: 642}
    },
    {
      id: "ext-6",
      names: {
        en: "Saferoom Exfil",
        ru: "Безопасная комната"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? pull the lever at the power plant + flush a toilet at Burger Spot + swipe card #11SR",
        ru: "??? нажать рычаг на электростанции + смыть унитаз в Burger Spot + провесит картой #11SR"
      },
      coords: {x: 641, y: 1558},
      activationCoords: {x: 2502, y: 772}
    },
  ]
};

export default mapData;