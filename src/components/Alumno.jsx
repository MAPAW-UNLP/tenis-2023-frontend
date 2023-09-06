
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

const Alumnos = ({info, setActAlu}) => {

  const mostrarNacimientoApropiadamente = () =>{
    if(info.fechanac !== ''){
      const date = (info.fechanac).split('-');
      return `${date[2]}/${date[1]}/${date[0]}`
    }
    else{
      return " - "
    }

  }
  return (
    <>
      <div className='alumno-info'> 
        <p>{info.nombre}</p>
        <p>{info.telefono}</p>
        <p>{mostrarNacimientoApropiadamente()}</p>
        <button id='edit-profesor-btn' onClick={()=>setActAlu({id:info.id, nombre:info.nombre, telefono:info.telefono, fechanac:info.fechanac})}><FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon></button>
      </div>
    </>
  )
}

export default Alumnos