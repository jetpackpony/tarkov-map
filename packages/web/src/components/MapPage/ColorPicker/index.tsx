import { h } from "preact";
import { HuePicker } from "react-color";
import styles from "./colorPicker.module.css";
import { Color } from "../../../types";
import { useLanguage } from "../../../language";

interface ColorPickerProps {
  color: Color;
  onChange: (color: Color) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const { t } = useLanguage();
  return (
    <div class={styles.colorPicker}>
      {t("Marker color")}
      <HuePicker
        width="70%"
        color={color}
        onChangeComplete={({ hex }) => onChange(hex)}
      />
    </div>
  );
};

export default ColorPicker;
