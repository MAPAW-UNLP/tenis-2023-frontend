import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

export const Profesor = ({info, setProfeDetail, setWillEdit}) => {

  return (
    <div className='profesor-info'>
        <p>{info.nombre}</p>
        <p>{info.telefono}</p>
        <button id='edit-profesor-btn' onClick={()=> setProfeDetail({id:info.id, nombre:info.nombre, telefono:info.telefono}, setWillEdit(true))}>
          <FontAwesomeIcon icon={faUserEdit}/>
        </button>
    </div>
  )
}
