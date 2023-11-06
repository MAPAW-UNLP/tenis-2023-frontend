import React, { useState, useEffect } from 'react'
import moment from 'moment';
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
  const [pagos, setPagos] = useState([]);
  const [actPagos, setActPagos] = useState(false);

  const [profesores, setProfesores] = useState([]);
  const [pagosLoader, setPagosLoader] = useState(true); // Spinner

  // Trae todos los PAGOS 
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setPagos(data))
      .then(() => setPagosLoader(() => false));

    fetch(`${URL_BASE}profesoress`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProfesores(ordenarPorNombre(data)))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actPagos]);

  // Estado para el formulario de "Agregar Pago"
  const [pagoAddForm, setPagoAddForm] = useState({
    idProfesor: '',
    concepto: '',
    monto: '',
    descripcion: ''
  })

  // Actualiza los datos del formulario para agregar un PAGO
  const handleChangeFormData = (e) => {
    setPagoAddForm({ ...pagoAddForm, [e.target.name]: e.target.value });
  };

  // Reseteo el formulario de COBRO
  const resetPagoAddForm = () => {
    setPagoAddForm({
      idProfesor: '',
      concepto: '',
      monto: '',
      descripcion: ''
    })
  }

  // Funcion para cerrar el formulario de creacion de PAGO
  const handleCloseForm = () => {
    resetPagoAddForm()
    setActive(false);
  };

  const submitCobroForm = (event) => {
    event.preventDefault();
    setActive(false);

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        concepto: pagoAddForm.concepto,
        monto: pagoAddForm.monto,
        descripcion: pagoAddForm.descripcion,
        fecha: moment().format('YYYY/MM/DD'),
      }),
    };

    fetch(`${URL_BASE}nuevo_pago`, requestOptions)
      .then((response) => response.json())
      .then(() => setActPagos((v) => !v));
  };

  // Opciones de movimiento (PAGO) para el formulario de 'Agregar Pago'

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
        <GenericLargeButton doSomething={() => setActive(true)} title={"Crear nuevo pago"} />

        <AgregarMovimiento active={active} handleCloseForm={handleCloseForm} submitMovimientoForm={submitCobroForm}
          handleChangeFormData={handleChangeFormData} personas={profesores} movimientoName={"Cobro"} movimientoOptions={movimientoOptions} />

        {pagosLoader ?
          <LoaderSpinner active={pagosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <MovimientoTable movimientos={pagos} />
        }
      </div>
    </div>
  )
}
