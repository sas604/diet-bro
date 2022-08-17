import React from 'react';
import styled from 'styled-components';

const FieldStyles = styled.div`
  position: relative;
  display: flex;

  input {
    text-indent: 10px;
    font-size: 1em;
    line-height: 1.3;
    padding: 0.7em 0;
    border: none;
    flex: 1;
    min-width: 0;
    border-radius: 3px;
    border: 1px solid var(--dark-purple);
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
  .suffix {
    position: absolute;
    right: 18px;
    top: 0.8em;
    margin: 0;
  }
  label {
    padding: 0.2em;
    color: var(--purple);
    position: absolute;
    left: 10px;
    top: -0.8em;
    transition: 0.1s ease-in;
    /* background-color: white; */
    background-color: var(--bg-primary);
    pointer-events: none;
  }

  .empty {
    left: 10px;
    top: 0.6em;
  }

  input:focus + p + label {
    top: -0.8em;
    transform: scale(0.9);
  }
`;
// controled input component
export default function ControledInput({
  handeler,
  value,
  label = 'label',
  suffix = null,
  type,
  style = {},
  inputStyle = {},
  required = false,
  max = null,
  min = null,
}) {
  return (
    <FieldStyles style={style}>
      <input
        id={label}
        type={type}
        name={label.toLowerCase()}
        required
        value={value}
        max={max}
        onChange={(e) => handeler(e)}
        style={inputStyle}
      />
      <p className={`suffix`}>{suffix}</p>
      <label className={value ? null : 'empty'} htmlFor="weight">
        {label}
      </label>
    </FieldStyles>
  );
}
