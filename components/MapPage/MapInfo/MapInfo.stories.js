import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import MapInfo from './index';

export default {
  title: 'MapInfo',
};

const extracts = [
  {
    id: "ext-1",
    names: {
      en: "PMC Only",
      ru: "В ЧВК"
    },
    faction: "pmc",
    specialConditions: null,
    coords: { x: 30, y: 30 },
  },
  {
    id: "ext-2",
    names: {
      en: "PMC Only spec. cond. + act.",
      ru: "А ЧВК Условия"
    },
    faction: "pmc",
    specialConditions: "??? когда горит фонарь",
    coords: { x: 50, y: 50 },
  },
  {
    id: "ext-3",
    names: {
      en: "All",
      ru: "Б Все"
    },
    faction: "all",
    specialConditions: null,
    coords: { x: 30, y: 30 },
  },
  {
    id: "ext-4",
    names: {
      en: "Scav spec. cond. + act.",
      ru: "Г Дикий Условия + Акт."
    },
    faction: "scav",
    specialConditions: "??? когда горит фонарь",
    coords: { x: 50, y: 50 },
    activationCoords: { x: 1525, y: 942 }
  },
  {
    id: "ext-5",
    names: {
      en: "Scav act.",
      ru: "В Дикий Акт."
    },
    faction: "scav",
    specialConditions: null,
    coords: { x: 50, y: 50 },
    activationCoords: { x: 1525, y: 942 }
  },
];

const toggleExtract = action("toggled");

export const emptyExtracts = () => (
  <MapInfo />
);

export const noneSelected = () => (
  <MapInfo
    extracts={extracts}
    selected={[]}
    toggleExtract={toggleExtract}
  />
);

export const withSelected = () => (
  <MapInfo
    extracts={extracts}
    selected={["ext-2"]}
    toggleExtract={toggleExtract}
  />
);
