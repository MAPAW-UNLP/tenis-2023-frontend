import React, { useState, useEffect } from 'react'
import { BalanceTable } from '../../components/Movimiento/BalanceTable'
import InputComponent from '../../components/Utils/InputComponent'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import LoaderSpinner from '../../components/LoaderSpinner'
import NavBar from '../Navbar/NavBar'

import '../../styles/movimiento/movimiento.css'

export const Balance = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [actMovimientos, setActMovimientos] = useState(false);

  // Estado para 'movimientos' y 'total' de balance
  const [balance, setBalance] = useState();

  const [movimientosLoader, setMovimientosLoader] = useState(true); // Spinner

  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  // Datos usados para el filtro de busqueda en balance
  const [datos, setDatos] = useState({
    fechaInicio: today,
    fechaFin: today,
    descripcion: ''
  })

  // Trae los datos necesarios desde la BD
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(`${URL_BASE}balance-en-fecha?fecha_inicio='${datos.fechaInicio}'&fecha_fin=${datos.fechaFin}&descripcion=${datos.descripcion}`,
    requestOptions)
      .then((response) => response.json())
      .then((data) => setBalance(data))
      .then(() => setMovimientosLoader(() => false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actMovimientos]);

  return (
    <div className='movimiento-component'>
      <NavBar title={'Balance general'} setSesion={setSesion} />
      <div className='movimiento-component-mainContent'>
        {movimientosLoader ?
          <LoaderSpinner active={movimientosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <>
            <div className="balance-container">
              <div className='balance-head'>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
                  <span style={{ marginRight: '.5em' }}>Filtros</span>
                  <InputComponent type={'date'} id={'fechaInicio'} className={'input-date-balance'} placeholder={'Fecha'} min={today}
                  // onChangeFuncion={handleFechaInicioChange}
                  />
                  <InputComponent type={'date'} id={'fechaFin'} className={'input-date-balance'} placeholder={'Fecha'} min={today}
                  // onChangeFuncion={handleFechaInicioChange}
                  />
                  <InputComponent type={'text'} id={'balanceDesc'} className={'input-text-balance'} placeholder={'Descripcion'}
                  // onChangeFuncion={handleFechaInicioChange}
                  />
                </div>
                <button className='button-balance-head' onClick={() => alert('Filtrado :)')}>Filtrar</button>
              </div>
            </div>
            <BalanceTable balance={balance} />
          </>
        }
      </div>
    </div>
  )
}
