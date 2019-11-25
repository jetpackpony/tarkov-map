import customsMainImg from '../mapImages/Customs.png';
import customsKeysImg from '../mapImages/Customs-Keys.jpg';

const mapData = {
  mapGroups: {
    "customs": {
      title: "Customs",
      maps: {
        "main": {
          title: "Main",
          imgPath: customsMainImg,
          extracts: [
            {
              names: {
                en: "test-1",
                ru: "тест-1"
              },
              coords: { x: 100, y: 100 }
            },
            {
              names: {
                en: "test-2",
                ru: "тест-2"
              },
              coords: { x: 200, y: 200 }
            }
          ]
        },
        "keys": {
          title: "Keys",
          imgPath: customsKeysImg,
          extracts: [
            {
              names: {
                en: "test-1",
                ru: "тест-1"
              },
              coords: { x: 100, y: 100 }
            },
            {
              names: {
                en: "test-2",
                ru: "тест-2"
              },
              coords: { x: 200, y: 200 }
            }
          ]
        }
      }
    }
  }
};

export default mapData;