import img from '../../mapImages/ReserveMain.png';

const mapData = {
  groupName: "Резерв / Reserve",
  title: "Главная",
  imgPath: img,
  extracts: [
    {
      id: "ext-1",
      names: {
        en: "Bunker Hermetic Door",
        ru: "Гермозатвор Бункера"
      },
      faction: "all",
      specialConditions: "??? нажать рычаг, звучит сирена. Сирена звучит 4 минуты после нажатия",
      coords: { x: 2770, y: 2165 },
      activationCoords: { x: 1525, y: 942 }
    },
    {
      id: "ext-2",
      names: {
        en: "Scav lands",
        ru: "Дикие места"
      },
      faction: "all",
      specialConditions: "??? нужна пара ЧВК + Дикий чтобы выйти",
      coords: { x: 1480, y: 2135 }
    },
    {
      id: "ext-3",
      names: {
        en: "Sewer manhole",
        ru: "Канализационный люк"
      },
      faction: "all",
      specialConditions: "??? только без рюкзака",
      coords: { x: 2110, y: 875 }
    },
    {
      id: "ext-4",
      names: {
        en: "Armored train",
        ru: "Бронепоезд"
      },
      faction: "all",
      specialConditions: "??? приезжает за ~30 минут до конца, стоит на платформе 8 минут",
      coords: { x: 3110, y: 1840 }
    },
    {
      id: "ext-5",
      names: {
        en: "Cliff descent",
        ru: "Спуск со скалы"
      },
      faction: "pmc",
      specialConditions: "??? нужен ледоруб и паракорд. Только без бронижилета",
      coords: { x: 1515, y: 105 }
    },
    {
      id: "ext-6",
      names: {
        en: "Hole in fence by the mountains",
        ru: "Дыра в заборе у скал"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 270, y: 1460 }
    },
    {
      id: "ext-7",
      names: {
        en: "CP fence",
        ru: "Забор у КПП"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 2380, y: 550 }
    },
    {
      id: "ext-8",
      names: {
        en: "Heating Pipe",
        ru: "Трубопровод отопления"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 2255, y: 2230 }
    },
    {
      id: "ext-9",
      names: {
        en: "Depot hermetic door",
        ru: "Гермодверь к депо"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 2914, y: 1563 },
    },
  ]
};

export default mapData;