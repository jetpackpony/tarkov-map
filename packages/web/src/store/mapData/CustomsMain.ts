import { Faction, MapGroupId } from "../../types";
import customsMainImg from "../../mapImages/CustomsMain.webp";

const mapData = {
  groupId: MapGroupId.Customs,
  groupName: {
    en: "Customs",
    ru: "Таможня",
  },
  title: {
    en: "Main",
    ru: "Главная",
  },
  imgPath: customsMainImg,
  extracts: [
    {
      id: "ext-18",
      names: {
        en: "ZB-1011",
        ru: "ЗБ-1011",
      },
      faction: Faction.PMC,
      specialConditions: null,
      coords: { x: 3053, y: 1220 },
    },
    {
      id: "ext-15",
      names: {
        en: "ZB-1012",
        ru: "ЗБ-1012",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? when the light is on",
        ru: "??? когда горит фонарь",
      },
      coords: { x: 2533, y: 1159 },
    },
    {
      id: "ext-12",
      names: {
        en: "Old Gas Station",
        ru: "Старая Заправка",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? if there is green smoke",
        ru: "??? когда горит зеленая дымовая шашка",
      },
      coords: { x: 2062, y: 1358 },
    },
    {
      id: "ext-2",
      names: {
        en: "Trailer Park",
        ru: "Трейлерный Парк",
      },
      faction: Faction.PMC,
      specialConditions: null,
      coords: { x: 167, y: 1485 },
    },
    {
      id: "ext-6",
      names: {
        en: "Smuggler's Boat",
        ru: "Лодка Контрабандиста",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? if there is fire by the water",
        ru: "??? когда горит костер",
      },
      coords: { x: 983, y: 440 },
    },
    {
      id: "ext-10",
      names: {
        en: "Dorms V-Ex",
        ru: "А-Выход у Общаги",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? 7000 Rub, need to wait for 1 min., 1 time use",
        ru: "??? 7000 Руб, ждать 1 минуту, одноразовый",
      },
      coords: { x: 1652, y: 140 },
    },
    {
      id: "ext-1",
      names: {
        en: "Crossroads",
        ru: "Перекресток",
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 118, y: 1027 },
    },
    {
      id: "ext-7",
      names: {
        en: "RUAF Roadblock",
        ru: "Блокпост ВС РФ",
      },
      faction: Faction.ALL,
      specialConditions: {
        en: "??? when the light is on",
        ru: "??? когда горит фонарь",
      },
      coords: { x: 1079, y: 1282 },
    },
    {
      id: "ext-22",
      names: {
        en: "Old Road Gate",
        ru: "Ворота на Старой Дороге",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1675, y: 146 },
    },
    {
      id: "ext-3",
      names: {
        en: "Trailer Park Workers' Shack",
        ru: "Времянка у трейл. Парка",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 337, y: 1518 },
    },
    {
      id: "ext-4",
      names: {
        en: "Railroad To Tarkov",
        ru: "ЖД до Таркова",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 604, y: 1482 },
    },
    {
      id: "ext-5",
      names: {
        en: "Railroad to Port",
        ru: "ЖД к Порту",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 674, y: 653 },
    },
    {
      id: "ext-8",
      names: {
        en: "Sniper Roadblock",
        ru: "Блокпост Снайперов",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1157, y: 404 },
    },
    {
      id: "ext-9",
      names: {
        en: "Warehouse 17",
        ru: "Склад 17",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1243, y: 1050 },
    },
    {
      id: "ext-11",
      names: {
        en: "Factory Shacks",
        ru: "Заводские Времянки",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1726, y: 754 },
    },
    {
      id: "ext-23",
      names: {
        en: "Old Gas Station",
        ru: "Старая Заправка",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 1991, y: 1413 },
    },
    {
      id: "ext-13",
      names: {
        en: "Warehouse 4",
        ru: "Склад 4",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 2149, y: 881 },
    },
    {
      id: "ext-14",
      names: {
        en: "Railroad To Military Base",
        ru: "ЖД к Военной Базе",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 2583, y: 163 },
    },
    {
      id: "ext-16",
      names: {
        en: "Passage between rocks",
        ru: "Проход между скалами",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 2728, y: 208 },
    },
    {
      id: "ext-17",
      names: {
        en: "Military Base CP",
        ru: "КПП Военной Базы",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 3058, y: 329 },
    },
    {
      id: "ext-19",
      names: {
        en: "Scavs checkpoint",
        ru: "КПП Диких",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 3094, y: 888 },
    },
    {
      id: "ext-20",
      names: {
        en: "Administration Gate",
        ru: "Административные Ворота",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 3165, y: 968 },
    },
    {
      id: "ext-21",
      names: {
        en: "Factory Far Corner",
        ru: "Дальний Угол Завода",
      },
      faction: Faction.SCAV,
      specialConditions: null,
      coords: { x: 3096, y: 1314 },
    },
    {
      id: "ext-24",
      names: {
        en: "ZB-1013",
        ru: "Гермозатвор Бункера",
      },
      faction: Faction.PMC,
      specialConditions: {
        en: "??? pull the lever + needs factory door key",
        ru: "??? нажать рычаг + нужен ключ от завода",
      },
      coords: { x: 1698, y: 1287 },
      activationCoords: { x: 2179, y: 939 },
    },
  ],
};

export default mapData;
