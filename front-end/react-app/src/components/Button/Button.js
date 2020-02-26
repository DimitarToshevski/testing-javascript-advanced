import React from 'react';

import './Button.css';

const Button = ({ text, onClick, isDisabled = false }) => (
  <button className="button" onClick={onClick} disabled={isDisabled}>
    {text}
  </button>
);

export default Button;
