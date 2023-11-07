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

  // Estado para 'totalCobros' 'totalPagos' y 'balanceGeneral'
  const [balanceNumerico, setBalanceNumerico] = useState();

  const [movimientosLoader, setMovimientosLoader] = useState(true); // Spinner

  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  // Trae los datos necesarios desde la BD
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(`${URL_BASE}balance-general`, requestOptions)
      .then((response) => response.json())
      .then((data) => setBalanceNumerico(data))
      .then(() => setMovimientosLoader(() => false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actMovimientos]);

  return (
    <div className='movimiento-component'>
      <NavBar title={'Balanza general'} setSesion={setSesion} />
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
            <BalanceTable balanceNumerico={balanceNumerico} />
          </>
        }
      </div>
    </div>
  )
}
