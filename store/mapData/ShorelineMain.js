import img from '../../mapImages/ShorelineMain.webp';

const mapData = {
  groupName: "Берег / Shoreline",
  title: "Главная",
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "Road to Customs",
        ru: "Дорога на Таможню"
      },
      faction: "all",
      specialConditions: null,
      coords: { x: 1700, y: 500 }
    },
    {
      id: "ext-2",
      names: {
        en: "CCP Temporary",
        ru: "Временный КПП"
      },
      faction: "pmc",
      specialConditions: "??? когда горят фонари",
      coords: { x: 1685, y: 1095 }
    },
    {
      id: "ext-3",
      names: {
        en: "Pier Boat",
        ru: "Лодка на Причале"
      },
      faction: "pmc",
      specialConditions: "??? когда есть катер в конце пирса",
      coords: { x: 1050, y: 1210 }
    },
    {
      id: "ext-4",
      names: {
        en: "Rock Passage",
        ru: "Проход через Скалы"
      },
      faction: "pmc",
      specialConditions: "??? когда есть зеленая дымовая шашка",
      coords: { x: 860, y: 45 }
    },
    {
      id: "ext-5",
      names: {
        en: "Tunnel",
        ru: "Тоннель"
      },
      faction: "pmc",
      specialConditions: null,
      coords: { x: 135, y: 890 }
    },
    {
      id: "ext-6",
      names: {
        en: "Adm Basement",
        ru: "Подвал в Адм.корпусе"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 945, y: 295 }
    },
    {
      id: "ext-7",
      names: {
        en: "Lighthouse",
        ru: "Маяк"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1205, y: 1215 }
    },
    {
      id: "ext-8",
      names: {
        en: "Ruined House Fence",
        ru: "Забор у разруш. дома"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 20, y: 445 }
    },
    {
      id: "ext-9",
      names: {
        en: "Ruined Road",
        ru: "Разрушенная дорога"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 165, y: 925 }
    },
    {
      id: "ext-10",
      names: {
        en: "RWing Gym Entrance",
        ru: "Вход в спортзал п.крыло"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1000, y: 375 }
    },
    {
      id: "ext-11",
      names: {
        en: "South Fence Passage",
        ru: "Проход в заборе на юге"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1295, y: 10 }
    },
    {
      id: "ext-12",
      names: {
        en: "Svetliy Dead End",
        ru: "Тупик Светлый"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 40, y: 650 }
    },
  ]
};

export default mapData;