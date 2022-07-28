import CustomsMain from './CustomsMain';
import CustomsHiddenStashes from './CustomsHiddenStashes';
import ShorelineMain from './ShorelineMain';
import ShorelineHiddenStashes from './ShorelineHiddenStashes';
import ShorelineKeys from './ShorelineKeys';
import ShorelineResort from './ShorelineResort';
import InterchangeMain from './InterchangeMain';
import InterchangeHiddenStashes from './InterchangeHiddenStashes';
import WoodsMain from './WoodsMain';
import WoodsCaches from './WoodsCaches';
import ReserveMain from './ReserveMain';
import ReserveKeysAndDoors from './ReserveKeysAndDoors';
import FactoryMain from './FactoryMain';
import LabsMain from './LabsMain';
import LighthouseMain from './LighthouseMain';
import LighthouseHiddenStashes from './LighthouseHiddenStashes';

const mapData = {
  maps: {
    "customs-main": CustomsMain,
    "customs-hidden-stashes": CustomsHiddenStashes,
    "factory-main": FactoryMain,
    "interchange-main": InterchangeMain,
    "interchange-hidden-stashes": InterchangeHiddenStashes,
    "labs-main": LabsMain,
    "lighthouse-main": LighthouseMain,
    "lighthouse-hidden-stashes": LighthouseHiddenStashes,
    "reserve-main": ReserveMain,
    "reserve-keys-and-doors": ReserveKeysAndDoors,
    "shoreline-main": ShorelineMain,
    "shoreline-hidden-stashes": ShorelineHiddenStashes,
    "shoreline-keys": ShorelineKeys,
    "shoreline-resort": ShorelineResort,
    "woods-main": WoodsMain,
    "woods-caches": WoodsCaches,
  }
};

export default mapData;