import { h } from 'preact';
import { useState } from 'preact/compat';
import { HuePicker } from 'react-color';
import './colorPicker.css'

const ColorPicker = ({ color, onChange }) => {
  return (
    <div class="colorPicker">
      Marker color:
      <HuePicker
        color={color}
        onChangeComplete={({ hex }) => onChange(hex)}
      />
    </div>
  );
};

export default ColorPicker;