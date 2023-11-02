import React, { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import { MovimientoTable } from '../../components/Movimiento/MovimientoTable'
import { AgregarMovimiento } from '../../components/Movimiento/AgregarMovimiento'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import LoaderSpinner from '../../components/LoaderSpinner'

import '../../styles/movimiento/movimiento.css'

export const Pagos = ({ setSesion }) => {
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
      concepto: "Profesor"
    },
    {
      id: 2,
      concepto: "Proveedor"
    },
    {
      id: 3,
      concepto: "Varios"
    }
  ];

  return (
    <div className='movimiento-component'>
      <NavBar title={'Pagos'} setSesion={setSesion} />
      <div className='movimiento-component-mainContent'>
        <GenericLargeButton doSomething={() => setActive(true)} title={"Crear nuevo pago"}/>
        <AgregarMovimiento active={active} setActive={setActive} setActCobros={setActCobros}
          alumnos={alumnos} movimientoName={"Pago"} movimientoOptions={movimientoOptions} />
        {cobrosLoader ?
          <LoaderSpinner active={cobrosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <MovimientoTable />
        }
      </div>
    </div>
  )
}
