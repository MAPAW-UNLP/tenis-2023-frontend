import React from 'react'

const SelectReComponent = ({className, name, id, onChange, options, deshabilitado, placeholder}) => {
  return (
    <select name={name} id={id} className={className} onChange={onChange} disabled={deshabilitado}>
        <option value=''> {placeholder} </option>
        {options.map((option, index) => <option value={option.id} id={`${option}-${index}`} key={`${option}-${index}`}>{option.concepto}</option>)}
    </select>
  )
}

export default SelectReComponent