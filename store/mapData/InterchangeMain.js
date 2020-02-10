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
      coords: { x: 166, y: 188 }
    },
    {
      id: "ext-2",
      names: {
        en: "Emercom Checkpoint",
        ru: "КПП МЧС"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 747, y: 777 }
    },
    {
      id: "ext-3",
      names: {
        en: "Power Station",
        ru: "ТЭЦ"
      },
      faction: "pmc",
      specialConditions: "??? 3000 руб, одноразовый",
      coords: { x: 683, y: 262 }
    }
  ]
};

export default mapData;