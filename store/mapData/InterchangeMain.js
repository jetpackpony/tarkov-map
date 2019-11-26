import img from '../../mapImages/InterchangeMain.jpg';

const mapData = {
  title: "Interchange Main",
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
      coords: { x: 290, y: 315 }
    },
    {
      id: "ext-2",
      names: {
        en: "Emercom Checkpoint",
        ru: "КПП МЧС"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1335, y: 1380 }
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