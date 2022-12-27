import { h } from "preact";
import { compose } from "rambda";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectCurrentLang, selectLanguage } from "../../store/uiSlice";
import LangPicker from "./LangPicker";

const LangPickerContainer = () => {
  const selectedLang = useAppSelector(selectCurrentLang);
  const dispatch = useAppDispatch();
  const onChangeLang = compose(dispatch, selectLanguage);

  return <LangPicker selectedLang={selectedLang} onChangeLang={onChangeLang} />;
};

export default LangPickerContainer;
