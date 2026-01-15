import CustomsDorms from "./CustomsDorms";
import CustomsHiddenStashes from "./CustomsHiddenStashes";
import CustomsMain from "./CustomsMain";
import FactoryMain from "./FactoryMain";
import GroundZero from "./GroundZero";
import InterchangeHiddenStashes from "./InterchangeHiddenStashes";
import InterchangeMain from "./InterchangeMainNew";
import InterchangeMainOld from "./InterchangeMainOld";
import LabsMain from "./LabsMain";
import Labyrinth from "./Labyrinth";
import LighthouseHiddenStashes from "./LighthouseHiddenStashes";
import LighthouseMain2D from "./LighthouseMain2D";
import LighthouseMain3D from "./LighthouseMain3D";
import ReserveKeysAndDoors from "./ReserveKeysAndDoors";
import ReserveMain2D from "./ReserveMain2D";
import ReserveMain3D from "./ReserveMain3D";
import ShorelineHiddenStashes from "./ShorelineHiddenStashes";
import ShorelineKeys from "./ShorelineKeys";
import ShorelineMain2D from "./ShorelineMain2D";
import ShorelineMain3D from "./ShorelineMain3D";
import ShorelineResort from "./ShorelineResort";
import StreetsMain2D from "./StreetsMain2D";
import StreetsMain3D from "./StreetsMain3D";
import Terminal from "./Terminal";
import WoodsCaches from "./WoodsCaches";
import WoodsMain2D from "./WoodsMain2D";
import WoodsMain3D from "./WoodsMain3D";
import { AllMapData } from "../../types";

export enum MapName {
  CustomsDorms = "CustomsDorms",
  CustomsHiddenStashes = "CustomsHiddenStashes",
  CustomsMain = "CustomsMain",
  FactoryMain = "FactoryMain",
  GroundZero = "GroundZero",
  InterchangeHiddenStashes = "InterchangeHiddenStashes",
  InterchangeMain = "InterchangeMain",
  InterchangeMainOld = "InterchangeMainOld",
  LabsMain = "LabsMain",
  Labyrinth = "Labyrinth",
  LighthouseHiddenStashes = "LighthouseHiddenStashes",
  LighthouseMain2D = "LighthouseMain2D",
  LighthouseMain3D = "LighthouseMain3D",
  ReserveKeysAndDoors = "ReserveKeysAndDoors",
  ReserveMain2D = "ReserveMain2D",
  ReserveMain3D = "ReserveMain3D",
  ShorelineHiddenStashes = "ShorelineHiddenStashes",
  ShorelineKeys = "ShorelineKeys",
  ShorelineMain2D = "ShorelineMain2D",
  ShorelineMain3D = "ShorelineMain3D",
  ShorelineResort = "ShorelineResort",
  StreetsMain2D = "StreetsMain2D",
  StreetsMain3D = "StreetsMain3D",
  Terminal = "Terminal",
  WoodsCaches = "WoodsCaches",
  WoodsMain2D = "WoodsMain2D",
  WoodsMain3D = "WoodsMain3D",
}

const mapData: AllMapData = {
  maps: {
    [MapName.CustomsDorms]: CustomsDorms,
    [MapName.CustomsHiddenStashes]: CustomsHiddenStashes,
    [MapName.CustomsMain]: CustomsMain,
    [MapName.FactoryMain]: FactoryMain,
    [MapName.GroundZero]: GroundZero,
    [MapName.InterchangeHiddenStashes]: InterchangeHiddenStashes,
    [MapName.InterchangeMain]: InterchangeMain,
    [MapName.InterchangeMainOld]: InterchangeMainOld,
    [MapName.LabsMain]: LabsMain,
    [MapName.Labyrinth]: Labyrinth,
    [MapName.LighthouseHiddenStashes]: LighthouseHiddenStashes,
    [MapName.LighthouseMain2D]: LighthouseMain2D,
    [MapName.LighthouseMain3D]: LighthouseMain3D,
    [MapName.ReserveKeysAndDoors]: ReserveKeysAndDoors,
    [MapName.ReserveMain2D]: ReserveMain2D,
    [MapName.ReserveMain3D]: ReserveMain3D,
    [MapName.ShorelineHiddenStashes]: ShorelineHiddenStashes,
    [MapName.ShorelineKeys]: ShorelineKeys,
    [MapName.ShorelineMain2D]: ShorelineMain2D,
    [MapName.ShorelineMain3D]: ShorelineMain3D,
    [MapName.ShorelineResort]: ShorelineResort,
    [MapName.StreetsMain2D]: StreetsMain2D,
    [MapName.StreetsMain3D]: StreetsMain3D,
    [MapName.Terminal]: Terminal,
    [MapName.WoodsCaches]: WoodsCaches,
    [MapName.WoodsMain2D]: WoodsMain2D,
    [MapName.WoodsMain3D]: WoodsMain3D,
  },
};

export const isMapName = (name: string): name is MapName => {
  return Object.values<string>(MapName).includes(name);
};

export default mapData;
