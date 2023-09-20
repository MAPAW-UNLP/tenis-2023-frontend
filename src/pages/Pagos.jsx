import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import NavBar from './NavBar'
import AgregarPago from '../components/AgregarPago'
import PagosList from '../components/PagosList'

import { ordenarPorNombre } from '../components/Utils/Functions'

import '../styles/pagos.css'

const Pagos = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [ active, setActive] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [actPagos, setActPagos] = useState(false);

  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    console.log("En useEffect")
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setPagos(data));
    
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actPagos]);

  return (
    <div id='pagos-Component'>
        <NavBar title={'Pagos'} setSesion={setSesion}></NavBar>

        <div id='pagos-component-mainContent'>
            <button id='canchas-add-btn' onClick={() => {setActive((active)=> true)}} >  <FontAwesomeIcon icon={faPlusCircle}/></button>
            <AgregarPago active={active} setActive={setActive} setPagos={setPagos}
              pagos={pagos} setActPagos={setActPagos} alumnos={alumnos} />
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