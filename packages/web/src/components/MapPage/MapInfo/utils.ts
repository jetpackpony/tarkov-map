import { sortBy, compose, toLower, path, defaultTo } from "rambda";
import { ExtractData } from "../../../types";
import { Language } from "../../../language";

const sortByName = (lang: Language) =>
  sortBy(
    compose(toLower, defaultTo(""), path<ExtractData, string>(["names", lang]))
  );
export const groupExtracts = (extracts: ExtractData[], lang: Language) => {
  const res = extracts.reduce(
    (acc, ext) => {
      if (ext.faction === "all" || ext.faction === "pmc") {
        acc.pmc.push(ext);
      }
      if (ext.faction === "all" || ext.faction === "scav") {
        acc.scav.push(ext);
      }
      return acc;
    },
    { pmc: [], scav: [] } as { pmc: ExtractData[]; scav: ExtractData[] }
  );

  res.pmc = sortByName(lang)(res.pmc);
  res.scav = sortByName(lang)(res.scav);

  return res;
};
