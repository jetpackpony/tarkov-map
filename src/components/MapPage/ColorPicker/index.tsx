import { h } from 'preact';
import { HuePicker } from 'react-color';
import './colorPicker.css'
import { Color } from '../../../types';
import { useLanguageContext } from '../../../I18nContext';

interface ColorPickerProps {
  color: Color,
  onChange: (color: Color) => void
};

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const { t } = useLanguageContext();
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