import React, { useState } from 'react';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

//Components
import FeedbackText from './FeedbackText';
import InputComponent from './InputComponent';

const ProfesorDetail = ({
  activeDetail,
  setActiveDetail,
  profeDetail,
  setProfeDetail,
  actProfe,
  setActProfe,
  profesores,
}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  //feedbackinline
  const [nombreFB, setNombreFB] = useState({ text: '', color: '' });
  const [telefonoFB, setTelefonoFB] = useState({ text: '', color: '' });

  const handleCloseForm = () => {
    /*setNombreFB({...nombreFB, 'text': '', color: ''});
        setTelefonoFB({...telefonoFB, 'text': '', color: ''});*/
    setActiveDetail(false);
  };

  const handleChangeName = (e) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const word = e.target.value.split(' ').join('');

    //validar que el nombrte sea solo texto y que no exista repetidos
    setNombre(e.target.value);
    if (e.target.value === '') {
      setNombreFB({ ...nombreFB, text: '', color: '' });
    } else {
      //Cumple las expectativas de ser un nombre
      if (pattern.test(word)) {
        if (
          profesores
            .map((each) => each.nombre.toUpperCase())
            .indexOf(e.target.value.toUpperCase()) === -1
        ) {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de profesor es correcto',
            color: '#7CBD1E',
          });
        } else {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de profesor ya existe',
            color: '#CC3636',
          });
        }
      } else {
        setNombreFB({
          ...nombreFB,
          text: 'Escriba un nombre de profesor sin numeros',
          color: '#CC3636',
        });
      }
    }
  };

  const handleChangePhone = (e) => {
    const pattern = '^[0-9]+$';
    const tel = e.target.value;
    setTelefono(tel);

    if (tel === '') {
      setTelefonoFB({ ...telefonoFB, text: '', color: '' });
    } else {
      if (tel.match(pattern) != null && telefono.length >= 6) {
        setTelefonoFB({
          ...telefonoFB,
          text: 'El nummero de telefono es correcto',
          color: '#7CBD1E',
        });
      } else {
        setTelefonoFB({
          ...telefonoFB,
          text: 'Solo numeros, minimo 7',
          color: '#CC3636',
        });
      }
    }
  };

  const actualizarProfesor = () => {
    const URL_BASE = 'http://localhost:8083/api/';
    const nombreProfe = document.getElementById('nombreProfesor').value;
    const telProfe = document.getElementById('telefonoProfesor').value;
    const data = {
      id: actProfe.id,
      esalumno: false,
    };
    nombreProfe == ''
      ? (data.nombre = actProfe.nombre)
      : (data.nombre = nombreProfe);
    telProfe == ''
      ? (data.telefono = actProfe.telefono)
      : (data.telefono = telProfe);

    setActiveDetail(false);

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
    };

    fetch(`${URL_BASE}persona`, requestOptions)
      .then((response) => response.json())
      .then((response) => setProfeDetail((v) => !v));
  };

  return (
    <>
      {activeDetail && (
        <div id="profesor-edit-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Editar Profesor</h2>
          {console.log(actProfe)}
          <div className="inputlabel">
            <InputComponent
              type={'text'}
              id={'nombreProfesor'}
              className={'profesor-add-form-input'}
              placeholder={actProfe.nombre}
              onChangeFuncion={handleChangeName}
            />
            <p className="feedbackInline" style={{ color: nombreFB.color }}>
              {nombreFB.text}
            </p>
          </div>
          <div className="inputlabel">
            <InputComponent
              type={'text'}
              id={'telefonoProfesor'}
              className={'profesor-add-form-input'}
              placeholder={actProfe.telefono}
              onChangeFuncion={handleChangePhone}
              min={7}
              max={12}
            />
            <p className="feedbackInline" style={{ color: telefonoFB.color }}>
              {telefonoFB.text}
            </p>
          </div>
          <div id="clase-detail-btns">
            <button id="clase-detail-guardar" onClick={actualizarProfesor}>
              Guardar
            </button>
            <button
              id="clase-detail-cancelar"
              onClick={() => setActiveDetail(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfesorDetail;
