import React from 'react';
import { MovimientoForm } from './MovimientoForm';

export const AgregarMovimiento = ({ active, handleCloseForm, submitMovimientoForm, movivimientoAddForm, handleChangeFormData,
  personas, movimientoName, movimientoOptions }) => {

  return (
    <>
      {active && <MovimientoForm handleCloseForm={handleCloseForm} submitMovimientoForm={submitMovimientoForm} personas={personas}
        handleChangeFormData={handleChangeFormData} movivimientoAddForm={movivimientoAddForm}
        movimientoOptions={movimientoOptions} movimiento={movimientoName} />}
    </>
  );
};
