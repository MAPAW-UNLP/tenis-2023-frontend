import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

const Pago = ({info,setActUser}) => {

    

    const returnTipoClase = (tipoClase) =>{
        if(tipoClase== 0){

            return 'Alquiler'
        }
        else if(tipoClase == 1){

            return 'Clase Indv.'
        }
        return 'Clase Grupal'
    }

    const mostrarFechaDescentemente = () =>{

        const date = (info.fecha).split('-');
        return `${date[2]}/${date[1]}/${date[0]}`
    }


  return (

    <div className='pago-info'>
        <p>{info.nombrePersona}</p>
        <p>{mostrarFechaDescentemente()}</p>
        <p>{returnTipoClase(info.idTipoClase)}</p>
        <p>{info.cantidad}</p>
        <button id='historial-usuario-btn' onClick={()=>setActUser({id:info.idPersona, nombre:info.nombrePersona})}><FontAwesomeIcon icon={faFileInvoiceDollar}></FontAwesomeIcon></button>
    </div>

  )
}

export default Pago