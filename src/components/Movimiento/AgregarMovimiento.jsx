import React from 'react';
import { MovimientoForm } from './MovimientoForm';

export const AgregarMovimiento = ({ active, handleCloseForm, submitMovimientoForm, handleChangeFormData,
  alumnos, movimientoName, movimientoOptions }) => {

  return (
    <>
      {active && <MovimientoForm handleCloseForm={handleCloseForm} submitMovimientoForm={submitMovimientoForm}
        handleChangeFormData={handleChangeFormData} movimientoOptions={movimientoOptions} movimiento={movimientoName} />}
    </>
  );
};
