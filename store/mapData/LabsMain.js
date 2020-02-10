import img from '../../mapImages/LabsMain.webp';

const mapData = {
  groupName: "Лаборатория / Labs",
  title: "Главная",
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "01 Cargo Elevator",
        ru: "01 Грузовой лифт"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 780, y: 1754 },
      activationCoords: { x: 1527, y: 5681 }
    },
    {
      id: "ext-2",
      names: {
        en: "02 Main Elevator",
        ru: "02 Центральный лифт"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1831, y: 4077 },
      activationCoords: { x: 1317, y: 4205 }
    },
    {
      id: "ext-3",
      names: {
        en: "03 Ventilation Shaft",
        ru: "03 Вентиляционная шахта"
      },
      faction: "all",
      specialConditions: "??? максимальный размер рюкзака MBSS (4х4)",
      coords: { x: 932, y: 5446 }
    },
    {
      id: "ext-4",
      names: {
        en: "04 Medical Block Elevator",
        ru: "04 Лифт медблока"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1634, y: 5894 },
      activationCoords: { x: 2083, y: 5736 }
    },
    {
      id: "ext-5",
      names: {
        en: "05 Sewage Conduit",
        ru: "05 Накопительный коллектор"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 2711, y: 5402 },
      activationCoords: { x: 2649, y: 5543 }
    },
    {
      id: "ext-6",
      names: {
        en: "06 Парковка",
        ru: "06 Parking Gate"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 151, y: 2819 },
      activationCoords: { x: 1023, y: 622 }
    },
    {
      id: "ext-7",
      names: {
        en: "07 Hangar Gate",
        ru: "07 Ангар"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 2703, y: 3381 },
      activationCoords: { x: 2215, y: 1284 }
    },
  ]
};

export default mapData;