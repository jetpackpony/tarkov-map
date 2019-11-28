import { h } from 'preact';
import { useState } from 'preact/compat';
import { HuePicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
  return (
    <div>
      Marker color:
      <HuePicker
        color={color}
        onChangeComplete={({ hex }) => onChange(hex)}
      />
    </div>
  );
};

export default ColorPicker;