import React from 'react';

import InputReComponent from '../Utils/InputReComponent';

export const ProfesorDetail = ({
  activeDetail,
  setActiveDetail,
  setProfeDetail,
  profeDetail,
  handleChangeName,
  handleChangePhone,
  feedback,
  clearState,
  setWillEdit,
  setActProfesores,
}) => {
  const URL_BASE = 'http://localhost:8083/api/';

  const handleCloseForm = () => {
    setActiveDetail(false)
    setWillEdit(false)
    setProfeDetail({})
    clearState()
  }

  const actualizarProfesor = () => {
    const nombreProfe = document.getElementById('nombreProfesor').value;
    const telProfe = document.getElementById('telefonoProfesor').value;

    const data = {
      id: profeDetail.id,
      esalumno: false,
    };

    nombreProfe === '' ? (data.nombre = profeDetail.nombre) : (data.nombre = nombreProfe); 
    telProfe === '' ? (data.telefono = profeDetail.telefono) : (data.telefono = telProfe);

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
    };

    fetch(`${URL_BASE}persona`, requestOptions)
      .then((response) => response.json())
      .then(() => handleCloseForm())
      .then(() => setProfeDetail({}))
      .then(() => setActProfesores((v) => !v));
  };

  return (
    <>
      {activeDetail && (
        <div id="profesor-edit-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}> x </button>
          <h2>Editar Profesor</h2>
          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              id={'nombreProfesor'}
              name={'nombre'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.nombre}
              onChangeFuncion={(e) => handleChangeName(e, 'clase-detail-guardar', '', false)}
            />
            <p className="feedbackInline" style={{ color: feedback.nombreFB.color }}>
              {feedback.nombreFB.text}
            </p>
          </div>
          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              name={'telefono'}
              id={'telefonoProfesor'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.telefono}
              onChangeFuncion={(e) => handleChangePhone(e, 'clase-detail-guardar', false)}
              min={7}
              max={12}
            />
            <p className="feedbackInline" style={{ color: feedback.telefonoFB.color }}>
              {feedback.telefonoFB.text}
            </p>
          </div>
          <div id="clase-detail-btns">
            {(feedback.nombreFBCorrecto && feedback.telefonoFBCorrecto) ?
              <button id="clase-detail-guardar" onClick={actualizarProfesor}> Guardar </button>
            :
              <button id="clase-detail-disabled" type='button' disabled={true}> Guardar </button>
            }
            <button id="clase-detail-cancelar" onClick={handleCloseForm}> Cancelar </button>
          </div>
        </div>
      )}
    </>
  );
};
