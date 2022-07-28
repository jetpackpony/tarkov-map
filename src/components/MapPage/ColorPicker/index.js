import { h } from 'preact';
import { HuePicker } from 'react-color';
import './colorPicker.css'
import { useTranslation } from 'react-i18next';

const ColorPicker = ({ color, onChange }) => {
  const { t } = useTranslation();
  return (
    <div class="colorPicker">
      {t('Marker color')}
      <HuePicker
        color={color}
        onChangeComplete={({ hex }) => onChange(hex)}
      />
    </div>
  );
};

export default ColorPicker;