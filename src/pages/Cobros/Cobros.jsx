import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../Navbar/NavBar'
import { AgregarCobro } from '../../components/Cobro/AgregarCobro'
import { CobrosList } from '../../components/Cobro/CobrosList'

import { ordenarPorNombre } from '../../components/Utils/Functions'

import '../../styles/cobros.css'
import LoaderSpinner from '../../components/LoaderSpinner'
import { CobrosTable } from '../../components/Cobro/CobrosTable'

export const Cobros = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [ active, setActive] = useState(false);
  const [cobros, setCobros] = useState([]);
  const [actCobros, setActCobros] = useState(false);

  const [alumnos, setAlumnos] = useState([]);
  const [cobrosLoader, setCobrosLoader] = useState(true); // Spinner

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCobros(data))
      .then(() => setCobrosLoader(() => false));

    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actCobros]);

  return (
    <div id='cobros-component'>
        <NavBar title={'Cobros'} setSesion={setSesion}/>
        <div id='cobros-component-mainContent'>
            <button className='cobros-add-btn' onClick={() => {setActive(()=> true)}}>
              <h1 className='cobros-add-btn-text'>Crear nuevo cobro</h1>
            </button>
            <AgregarCobro active={active} setActive={setActive} setActCobros={setActCobros} alumnos={alumnos} />
            {cobrosLoader ? 
              <LoaderSpinner active={cobrosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'}/>
            :
              // <CobrosList cobros={cobros} />
              <CobrosTable/>
            }
        </div>
    </div>
  )
}
