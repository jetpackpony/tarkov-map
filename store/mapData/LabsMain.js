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
      coords: { x: 914, y: 2039 },
      activationCoords: { x: 1747, y: 6570 }
    },
    {
      id: "ext-2",
      names: {
        en: "02 Main Elevator",
        ru: "02 Центральный лифт"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 2105, y: 4725 },
      activationCoords: { x: 1508, y: 4852 }
    },
    {
      id: "ext-3",
      names: {
        en: "03 Ventilation Shaft",
        ru: "03 Вентиляционная шахта"
      },
      faction: "all",
      specialConditions: "??? максимальный размер рюкзака MBSS (4х4)",
      coords: { x: 1061, y: 6298 }
    },
    {
      id: "ext-4",
      names: {
        en: "04 Medical Block Elevator",
        ru: "04 Лифт медблока"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1883, y: 6805 },
      activationCoords: { x: 2383, y: 6628 }
    },
    {
      id: "ext-5",
      names: {
        en: "05 Sewage Conduit",
        ru: "05 Накопительный коллектор"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 3035, y: 6380 },
      activationCoords: { x: 3110, y: 6241 }
    },
    {
      id: "ext-6",
      names: {
        en: "06 Парковка",
        ru: "06 Parking Gate"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 207, y: 3276 },
      activationCoords: { x: 1206, y: 738 }
    },
    {
      id: "ext-7",
      names: {
        en: "07 Hangar Gate",
        ru: "07 Ангар"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 3147, y: 3935 },
      activationCoords: { x: 2581, y: 1501 }
    },
  ]
};

export default mapData;