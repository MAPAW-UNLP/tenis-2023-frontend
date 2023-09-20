import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import '../../styles/profesorLoader.css'

export const Profesor = ({ info, setProfeDetail, profeDetail, setWillEdit, loadingDetails, setLoadingDetails }) => {

  const LoadingSpinner = () => {
    return(
      <div id="loading"></div>
    )
  }
  return (
    <div className='profesor-info'>
        <p>{info.nombre}</p>
        <p>{info.telefono}</p>
        <p>Esto_es_un_email_de_prueba@gmail.com</p>
        <button id='edit-profesor-btn' style={{margin: 'auto'}}
          onClick={()=> setProfeDetail({id:info.id, nombre:info.nombre, telefono:info.telefono}, setWillEdit(true), setLoadingDetails(true))}>
          {(loadingDetails && profeDetail.id === info.id) ? 
            <LoadingSpinner active={loadingDetails} containerClass={'contenedorLogin'} loaderClass={'loader'}/> 
          : 
            <FontAwesomeIcon icon={faUserEdit}/> 
          }
        </button>
    </div>
  )
}
