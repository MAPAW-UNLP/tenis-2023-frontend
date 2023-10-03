import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../Navbar/NavBar'
import { AgregarCobro } from '../../components/Cobro/AgregarCobro'
import { CobrosList } from '../../components/Cobro/CobrosList'

import { ordenarPorNombre } from '../../components/Utils/Functions'

import '../../styles/cobros.css'

export const Cobros = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [ active, setActive] = useState(false);
  const [cobros, setCobros] = useState([]);
  const [actCobros, setActCobros] = useState(false);

  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCobros(data));
    
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actCobros]);

  return (
    <div id='cobros-Component'>
        <NavBar title={'Cobros'} setSesion={setSesion}/>
        <div id='cobros-component-mainContent'>
            <button id='canchas-add-btn' onClick={() => {setActive(()=> true)}}>
              <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
            <AgregarCobro active={active} setActive={setActive} setActCobros={setActCobros} alumnos={alumnos} />
            {cobros.length === 0 ?
              <div> cargando componente </div>
            :
              <CobrosList cobros={cobros} />
            }
        </div>
    </div>
  )
}
