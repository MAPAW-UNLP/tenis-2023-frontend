import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

const Profesor = ({info, setActProfe}) => {

  return (
    <div className='profesor-info'>
        <p>{info.nombre}</p>
        <p>{info.telefono}</p>
        <button id='edit-profesor-btn' onClick={()=>setActProfe({id:info.id, nombre:info.nombre, telefono:info.telefono})}><FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon></button>
    </div>
  )
}

export default Profesor