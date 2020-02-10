import img from '../../mapImages/ReserveMain.webp';

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
      coords: { x: 653, y: 183 },
      activationCoords: { x: 1253, y: 782 }
    },
    {
      id: "ext-2",
      names: {
        en: "Scav lands",
        ru: "Дикие места"
      },
      faction: "all",
      specialConditions: "??? нужна пара ЧВК + Дикий чтобы выйти",
      coords: { x: 1269, y: 207 }
    },
    {
      id: "ext-3",
      names: {
        en: "Sewer manhole",
        ru: "Канализационный люк"
      },
      faction: "all",
      specialConditions: "??? только без рюкзака",
      coords: { x: 971, y: 806 }
    },
    {
      id: "ext-4",
      names: {
        en: "Armored train",
        ru: "Бронепоезд"
      },
      faction: "all",
      specialConditions: "??? приезжает за ~30 минут до конца, стоит на платформе 8 минут",
      coords: { x: 489, y: 350 }
    },
    {
      id: "ext-5",
      names: {
        en: "Cliff descent",
        ru: "Спуск со скалы"
      },
      faction: "pmc",
      specialConditions: "??? нужен ледоруб и паракорд. Только без бронижилета",
      coords: { x: 1247, y: 1171 }
    },
    {
      id: "ext-6",
      names: {
        en: "Hole in fence by the mountains",
        ru: "Дыра в заборе у скал"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 1861, y: 559 }
    },
    {
      id: "ext-7",
      names: {
        en: "CP fence",
        ru: "Забор у КПП"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 838, y: 952 }
    },
    {
      id: "ext-8",
      names: {
        en: "Heating Pipe",
        ru: "Трубопровод отопления"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 893, y: 159 }
    },
    {
      id: "ext-9",
      names: {
        en: "Depot hermetic door",
        ru: "Гермодверь к депо"
      },
      faction: "scav",
      specialConditions: null,
      coords: { x: 546, y: 505 }
    },
  ]
};

export default mapData;