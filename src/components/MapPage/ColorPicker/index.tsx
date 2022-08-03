import { h } from 'preact';
import { HuePicker } from 'react-color';
import './colorPicker.css'
import { useTranslation } from 'react-i18next';
import { Color } from '../../../types';

interface ColorPickerProps {
  color: Color,
  onChange: (color: Color) => void
};

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
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