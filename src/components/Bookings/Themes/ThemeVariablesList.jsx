import React from 'react';
import './ThemeVariablesList.css';

const ThemeVariablesList = ({ themeVariables }) => {
  return (
    <div className="theme-variables-list">
      <h3>Theme Variables</h3>
      <ul>
        {themeVariables.map((variable) => (
          <li key={variable} className="theme-variable-item">
            {variable}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeVariablesList;