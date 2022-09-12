import { Faction, MapGroupId } from "../../types";
import img from "../../mapImages/ReserveMain.webp";

const mapData = {
  groupId: MapGroupId.Reserve,
  groupName: {
    en: "Reserve",
    ru: "Резерв ",
  },
  title: {
    en: "Main",
    ru: "Главная",
  },
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "Bunker Hermetic Door",
        ru: "Гермозатвор Бункера",
      },
      faction: Faction.ALL,
      specialConditions: {
        en: "??? press the lever, it start the alarm which will go on for 4 mins",
        ru: "??? нажать рычаг, звучит сирена. Сирена звучит 4 минуты после нажатия",
      },
      coords: { x: 2036, y: 1252 },
      activationCoords: { x: 1109, y: 626 },
    },
    {
      id: "ext-2",
      names: {
        en: "Scav lands",
        ru: "Дикие места",
      },
      faction: Faction.ALL,
      specialConditions: {
        en: "??? you need to be a scav + pmc team to extract",
        ru: "??? нужна пара ЧВК + Дикий чтобы выйти",
      },
      coords: { x: 1019, y: 1207 },
    },
    {
      id: "ext-3",
      names: {
        en: "Sewer manhole",
        ru: "Канализационный люк",
      },
      faction: Faction.ALL,
      specialConditions: {
        en: "??? no backpack only",
        ru: "??? только без рюкзака",
      },
      coords: { x: 1512, y: 599 },
    },
    {
      id: "ext-4",
      names: {
        en: "Armored train",
        ru: "Бронепоезд",
      },
      faction: Faction.ALL,
      specialConditions: {
        en: "??? train arrives ~30 til the end of match. It stays for 8 mins",
        ru: "??? приезжает за ~30 минут до конца, стоит на платформе 8 минут",
      },
      coords: { x: 2295, y: 1027 },
    },
    {
      id: "ext-5",
      names: {
        en: "Cliff descent",
        ru: "Спуск со скалы",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? you need RR icepick and paracord. Can't be wearing armor",
        ru: "??? нужен ледоруб и паракорд. Только без бронижилета",
      },
      coords: { x: 1107, y: 125 },
    },
    {
      id: "ext-6",
      names: {
        en: "Hole in fence by the mountains",
        ru: "Дыра в заборе у скал",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 194, y: 738 },
    },
    {
      id: "ext-7",
      names: {
        en: "CP fence",
        ru: "Забор у КПП",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1554, y: 460 },
    },
    {
      id: "ext-8",
      names: {
        en: "Heating Pipe",
        ru: "Трубопровод отопления",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1489, y: 1268 },
    },
    {
      id: "ext-9",
      names: {
        en: "Depot hermetic door",
        ru: "Гермодверь к депо",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 2575, y: 325 },
    },
    {
      id: "ext-10",
      names: {
        en: "D-2",
        ru: "Д-2",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? pull the lever, then press the button at the extract",
        ru: "??? нажать рычаг, затем нажать кнопку перед выходом",
      },
      coords: { x: 3102, y: 464 },
      activationCoords: { x: 3340, y: 1186 },
    },
  ],
};

export default mapData;
