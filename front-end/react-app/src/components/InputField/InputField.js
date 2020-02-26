import React from 'react';

import './InputField.css';

const InputField = ({ name, label, type = 'text', value = '', onChange }) => (
  <div className="input-container">
    <label htmlFor={name}>{label}</label>
    <input id={name} type={type} value={value} onChange={onChange} />
  </div>
);

export default InputField;
