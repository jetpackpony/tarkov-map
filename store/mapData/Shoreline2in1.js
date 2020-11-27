import img from '../../mapImages/Shoreline2in1.webp';

const mapData = {
  groupId: "shoreline",
  groupName: {
    en: "Shoreline",
    ru: "Берег"
  },
  title: {
    en: "2 in 1",
    ru: "два в одном"
  },
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
      coords: {x: 2242, y: 653}
    },
    {
      id: "ext-2",
      names: {
        en: "CCP Temporary",
        ru: "Временный КПП"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? when the light is on",
        ru: "??? когда горит фонарь"
      },
      coords: {x: 2214, y: 1405}
    },
    {
      id: "ext-3",
      names: {
        en: "Pier Boat",
        ru: "Лодка на Причале"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? if there is a boat at the end of the pier",
        ru: "??? когда есть катер в конце пирса"
      },
      coords: {x: 1374, y: 1577}
    },
    {
      id: "ext-4",
      names: {
        en: "Rock Passage",
        ru: "Проход через Скалы"
      },
      faction: "pmc",
      specialConditions: {
        en: "??? if there is green smoke",
        ru: "??? когда горит зеленая дымовая шашка"
      },
      coords: {x: 1114, y: 93}
    },
    {
      id: "ext-5",
      names: {
        en: "Tunnel",
        ru: "Тоннель"
      },
      faction: "pmc",
      specialConditions: null,
      coords: {x: 197, y: 1158}
    },
    {
      id: "ext-6",
      names: {
        en: "Adm Basement",
        ru: "Подвал в Адм.корпусе"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1227, y: 398}
    },
    {
      id: "ext-7",
      names: {
        en: "Lighthouse",
        ru: "Маяк"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1579, y: 1555}
    },
    {
      id: "ext-8",
      names: {
        en: "Ruined House Fence",
        ru: "Забор у разруш. дома"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 22, y: 577}
    },
    {
      id: "ext-9",
      names: {
        en: "Ruined Road",
        ru: "Разрушенная дорога"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 205, y: 1194}
    },
    {
      id: "ext-10",
      names: {
        en: "RWing Gym Entrance",
        ru: "Вход в спортзал п.крыло"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 1297, y: 479}
    },
    {
      id: "ext-11",
      names: {
        en: "South Fence Passage",
        ru: "Проход в заборе на юге"
      },
      faction: "scav",
      specialConditions: null,
      coords:  {x: 1701, y: 34}
    },
    {
      id: "ext-12",
      names: {
        en: "Svetliy Dead End",
        ru: "Тупик Светлый"
      },
      faction: "scav",
      specialConditions: null,
      coords: {x: 47, y: 828}
    },
  ]
};

export default mapData;