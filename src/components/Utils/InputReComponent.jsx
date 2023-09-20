import React from 'react'

const InputReComponent = ({type, name, id, className, placeholder, onChangeFuncion, deshabilitado, min, max}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={className}
      placeholder={placeholder}
      onChange={onChangeFuncion}
      disabled={deshabilitado}
      minLength={min}
      maxLength={max}
      min={min}
    />
  );
}

export default InputReComponent