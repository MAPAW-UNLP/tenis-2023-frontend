import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import Select from 'react-select';

export const AgregarCobro = ({ active, setActive, setActCobros, alumnos }) => {
  const URL_BASE = `http://localhost:8083/api/`;
  const [user_id, setUser_id] = useState('');
  const [tipoClase, setTipoClase] = useState('');
  const [cant, setCant] = useState('');

  const handleChangeUser_id = (e) => {
    setUser_id(e.value);
  };

  const handleChangeClassType = (e) => {
    setTipoClase(e.target.value);
  };

  const handleChangeCantidad = (e) => {
    setCant(e.target.value);
  };

  const handleCloseForm = () => {
    setActive(false);
  };

  const submitCobroForm = (e) => {
    e.preventDefault();
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        idPersona: user_id,
        fecha: moment().format('YYYY/MM/DD'),
        pagos: `${tipoClase}:${cant}`,
      }),
    };

    console.log(requestOptions.body);

    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then(() => setActCobros((v) => !v));
  };
  return (
    <>
      {active && (
        <div id="cobro-add-component">
          <button id="close-cobro-add-form" onClick={handleCloseForm}> x </button>
          <h2>Nuevo cobro</h2>
          <form action="" id="cobro-add-form" onSubmit={submitCobroForm}>
            <label className="cobro-form-label"> Alumno </label>
            <Select
              className="inputReserva"
              onChange={handleChangeUser_id}
              options={alumnos.map((el) => ({
                label: el.nombre,
                value: el.id,
              }))}
              placeholder="Seleccionar"
            />
            <label htmlFor="" className="cobro-form-label"> Tipo </label>
            <select
              name=""
              onChange={handleChangeClassType}
              id="cobro-form-select"
              placeholder="De reserva"
              className={'profesor-add-form-input'}
            >
              <option value="">Seleccionar tipo de clase</option>
              <option value="1">Clase individual</option>
              <option value="2">Clase grupal</option>
            </select>

            <label htmlFor="" className="cobro-form-label">
              Cantidad Clases
            </label>
            <input
              type="number"
              id="cobro-form-input"
              min={1}
              pattern="\d*"
              max={20}
              onChange={handleChangeCantidad}
              className={'profesor-add-form-input'}
            />

            <button id="cobro-add-form-addBtn">
              <FontAwesomeIcon id="cobros-add-form-btn" icon={faPlusCircle} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
