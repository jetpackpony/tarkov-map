import CustomsMain from "./CustomsMain";
import CustomsHiddenStashes from "./CustomsHiddenStashes";
import ShorelineMain from "./ShorelineMain";
import ShorelineHiddenStashes from "./ShorelineHiddenStashes";
import ShorelineKeys from "./ShorelineKeys";
import ShorelineResort from "./ShorelineResort";
import InterchangeMain from "./InterchangeMain";
import InterchangeHiddenStashes from "./InterchangeHiddenStashes";
import WoodsMain from "./WoodsMain";
import WoodsCaches from "./WoodsCaches";
import ReserveMain from "./ReserveMain";
import ReserveKeysAndDoors from "./ReserveKeysAndDoors";
import FactoryMain from "./FactoryMain";
import LabsMain from "./LabsMain";
import LighthouseMain from "./LighthouseMain";
import LighthouseHiddenStashes from "./LighthouseHiddenStashes";
import { AllMapData } from "../../types";

export enum MapName {
  CustomsMain = "customs-main",
  CustomsHiddenStashes = "customs-hidden-stashes",
  FactoryMain = "factory-main",
  InterchangeMain = "interchange-main",
  InterchangeHiddenStashes = "interchange-hidden-stashes",
  LabsMain = "labs-main",
  LighthouseMain = "lighthouse-main",
  LighthouseHiddenStashes = "lighthouse-hidden-stashes",
  ReserveMain = "reserve-main",
  ReserveKeysAndDoors = "reserve-keys-and-doors",
  ShorelineMain = "shoreline-main",
  ShorelineHiddenStashes = "shoreline-hidden-stashes",
  ShorelineKeys = "shoreline-keys",
  ShorelineResort = "shoreline-resort",
  WoodsMain = "woods-main",
  WoodsCaches = "woods-caches",
}

const mapData: AllMapData = {
  maps: {
    [MapName.CustomsMain]: CustomsMain,
    [MapName.CustomsHiddenStashes]: CustomsHiddenStashes,
    [MapName.FactoryMain]: FactoryMain,
    [MapName.InterchangeMain]: InterchangeMain,
    [MapName.InterchangeHiddenStashes]: InterchangeHiddenStashes,
    [MapName.LabsMain]: LabsMain,
    [MapName.LighthouseMain]: LighthouseMain,
    [MapName.LighthouseHiddenStashes]: LighthouseHiddenStashes,
    [MapName.ReserveMain]: ReserveMain,
    [MapName.ReserveKeysAndDoors]: ReserveKeysAndDoors,
    [MapName.ShorelineMain]: ShorelineMain,
    [MapName.ShorelineHiddenStashes]: ShorelineHiddenStashes,
    [MapName.ShorelineKeys]: ShorelineKeys,
    [MapName.ShorelineResort]: ShorelineResort,
    [MapName.WoodsMain]: WoodsMain,
    [MapName.WoodsCaches]: WoodsCaches,
  },
};

export const isMapName = (name: string): name is MapName => {
  return Object.values<string>(MapName).includes(name);
};

export default mapData;
