import React, {useState} from 'react'


//font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

//components
import NavBar from './NavBar'
import AgregarPago from '../components/AgregarPago'
import PagosList from '../components/PagosList'
//styles

import '../styles/pagos.css'
const Pagos = ({pagos, actPagos, setActPagos, setPagos , alumnos, setSesion}) => {
  const [ active, setActive] = useState(false);
  
  return (
    <div id='pagos-Component'>
        <NavBar title={'Pagos'} setSesion={setSesion}></NavBar>

        <div id='pagos-component-mainContent'>
            <button id='canchas-add-btn' onClick={() => {setActive((active)=> true)}} >  <FontAwesomeIcon icon={faPlusCircle}/></button>
            <AgregarPago  active={active} setActive={setActive} setPagos={setPagos} pagos={pagos} setActPagos={setActPagos} alumnos={alumnos} />
            { pagos.length === 0 ?
                <div> cargando componente</div>
            :
             <PagosList pagos={pagos} />
            }
        </div>

    </div>
  )
}

export default Pagos