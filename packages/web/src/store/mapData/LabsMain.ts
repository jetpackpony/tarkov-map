import { Faction, MapGroupId } from '../../types';
import img from '../../mapImages/LabsMain.webp';

const mapData = {
  groupId: MapGroupId.Labs,
  groupName: {
    en: "Labs",
    ru: "Лаборатория"
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
        en: "01 Cargo Elevator",
        ru: "01 Грузовой лифт"
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 665, y: 969 },
      activationCoords: { x: 832, y: 2442 }
    },
    {
      id: "ext-2",
      names: {
        en: "02 Main Elevator",
        ru: "02 Центральный лифт"
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 1211, y: 2226 },
      activationCoords: { x: 1102, y: 2209 }
    },
    {
      id: "ext-3",
      names: {
        en: "03 Ventilation Shaft",
        ru: "03 Вентиляционная шахта"
      },
      faction: Faction.ALL,
      specialConditions: {
        en: "??? maximum backpack size is MBSS (4х4)",
        ru: "??? максимальный размер рюкзака MBSS (4х4)"
      },
      coords: { x: 772, y: 2352 }
    },
    {
      id: "ext-4",
      names: {
        en: "04 Medical Block Elevator",
        ru: "04 Лифт медблока"
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 809, y: 2488 },
      activationCoords: { x: 904, y: 2516 }
    },
    {
      id: "ext-5",
      names: {
        en: "05 Sewage Conduit",
        ru: "05 Накопительный коллектор"
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 1058, y: 2571 },
      activationCoords: { x: 1086, y: 2553 }
    },
    {
      id: "ext-6",
      names: {
        en: "06 Парковка",
        ru: "06 Parking Gate"
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 872, y: 1452 },
      activationCoords: { x: 1020, y: 802 }
    },
    {
      id: "ext-7",
      names: {
        en: "07 Hangar Gate",
        ru: "07 Ангар"
      },
      faction: Faction.ALL,
      specialConditions: null,
      coords: { x: 1164, y: 1845 },
      activationCoords: { x: 1090, y: 1064 }
    },
  ]
};

export default mapData;