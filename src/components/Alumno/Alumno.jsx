
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

const Alumnos = ({ info, setActAlu, setActUser }) => {

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
        {/* <p>{mostrarNacimientoApropiadamente()}</p> */}
        <button id='edit-profesor-btn' style={{fontSize:'.9em', fontWeight:'bold'}}
          onClick={() => setActUser({id:info.id, nombre:info.nombre})}>
            Ver
        </button>
        {/* <button id='historial-usuario-btn' onClick={()=> setActUser({id:info.idPersona, nombre:info.nombrePersona})}>
              <FontAwesomeIcon icon={faFileInvoiceDollar}/>
            </button> */}
        <button id='edit-profesor-btn' 
          onClick={()=>setActAlu({id:info.id, nombre:info.nombre, telefono:info.telefono, fechanac:info.fechanac})}>
            <FontAwesomeIcon icon={faUserEdit}/>
        </button>
      </div>
    </>
  )
}

export default Alumnos