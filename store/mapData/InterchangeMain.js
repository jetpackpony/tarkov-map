import img from '../../mapImages/InterchangeMain.webp';

const mapData = {
  groupName: "Развязка / Interchange",
  title: "Главная",
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
      coords: { x: 300, y: 380 }
    },
    {
      id: "ext-2",
      names: {
        en: "Emercom Checkpoint",
        ru: "КПП МЧС"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1320, y: 1350 }
    },
    {
      id: "ext-3",
      names: {
        en: "Power Station",
        ru: "ТЭЦ"
      },
      faction: "pmc",
      specialConditions: "??? 3000 руб, одноразовый",
      coords: { x: 1200, y: 465 }
    }
  ]
};

export default mapData;