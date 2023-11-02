import React, { useState, useEffect } from 'react'
import { AgregarMovimiento } from '../../components/Movimiento/AgregarMovimiento'
import { MovimientoTable } from '../../components/Movimiento/MovimientoTable'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import NavBar from '../Navbar/NavBar'

import '../../styles/movimiento/movimiento.css'

export const Cobros = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [active, setActive] = useState(false);
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

  const movimientoOptions = [
    {
      id: 1,
      concepto: "Alumno"
    },
    {
      id: 2,
      concepto: "Alquiler"
    },
    {
      id: 3,
      concepto: "Varios"
    }
  ];

  return (
    <div className='movimiento-component'>
      <NavBar title={'Cobros'} setSesion={setSesion} />
      <div className='movimiento-component-mainContent'>
        <GenericLargeButton doSomething={() => setActive(true)} title={"Crear nuevo cobro"} />
        <AgregarMovimiento active={active} setActive={setActive} setActCobros={setActCobros}
          alumnos={alumnos} movimientoName={"Cobro"} movimientoOptions={movimientoOptions} />
        {cobrosLoader ?
          <LoaderSpinner active={cobrosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <MovimientoTable />
        }
      </div>
    </div>
  )
}
