import React from 'react';
//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
//Components
import FeedbackText from '../FeedbackText';
import InputComponent from '../Utils/InputComponent';
import InputReComponent from '../Utils/InputReComponent';

const AgregarProfesor = ({
  active,
  setActive,
  setProfesores,
  profesores,
  setActProfesores,
  setProfesoresLoader,
  handleChangeName,
  feedback
}) => {
  const URL_BASE = `http://localhost:8083/api/`;
  // const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  //feedvackinline
  const [nombreFB, setNombreFB] = useState({ text: '', color: '' });
  const [telefonoFB, setTelefonoFB] = useState({ text: '', color: '' });

  // const handleChangeName = (e) => {
  //   const pattern = new RegExp('^[A-Z]+$', 'i');
  //   const word = e.target.value.split(' ').join('');
  //   const submitBtn = document.getElementById('profesor-add-form-addBtn');

  //   //validar que el nombrte sea solo texto y que no exista repetidos
  //   setNombre(e.target.value);
  //   const nextInput = document.getElementById('telefonotinput');
  //   if (e.target.value === '') {
  //     setNombreFB({ ...nombreFB, text: '', color: '' });
  //     nextInput.disabled = true;
  //     submitBtn.disabled = true;
  //   } else {
  //     //Cumple las expectativas de ser un nombre
  //     if (pattern.test(word)) {
  //       if (
  //         profesores
  //           .map((each) => each.nombre.toUpperCase())
  //           .indexOf(e.target.value.toUpperCase()) === -1
  //       ) {
  //         setNombreFB({
  //           ...nombreFB,
  //           text: 'El nombre de profesor es correcto',
  //           color: '#7CBD1E',
  //         });
  //         nextInput.disabled = false;
  //       } else {
  //         setNombreFB({
  //           ...nombreFB,
  //           text: 'El nombre de profesor ya existe',
  //           color: '#CC3636',
  //         });
  //         nextInput.disabled = true;
  //         submitBtn.disabled = true;
  //       }
  //     } else {
  //       setNombreFB({
  //         ...nombreFB,
  //         text: 'Escriba un nombre de profesor sin numeros',
  //         color: '#CC3636',
  //       });
  //       submitBtn.disabled = true;
  //     }
  //   }
  // };

  const handleChangePhone = (e) => {
    const pattern = '^[0-9]+$';
    const tel = e.target.value;
    setTelefono(tel);
    const submitBtn = document.getElementById('profesor-add-form-addBtn');

    if (tel === '') {
      setTelefonoFB({ ...telefonoFB, text: '', color: '' });
      submitBtn.disabled = true;
    } else {
      if (tel.match(pattern) != null && telefono.length >= 6) {
        setTelefonoFB({
          ...telefonoFB,
          text: 'El nummero de telefono es correcto',
          color: '#7CBD1E',
        });
        submitBtn.disabled = false;
      } else {
        setTelefonoFB({
          ...telefonoFB,
          text: 'Solo numeros, minimo 7',
          color: '#CC3636',
        });
        submitBtn.disabled = true;
      }
    }
  };

  const submitProfesorForm = (e) => {
    e.preventDefault();
    setNombreFB({ ...nombreFB, text: '', color: '' });
    setTelefonoFB({ ...telefonoFB, text: '', color: '' });
    setProfesoresLoader((prevValue) => !prevValue);
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        // nombre: nombre,
        telefono: telefono,
        esalumno: false,
      }),
    };

    fetch(`${URL_BASE}persona`, requestOptions)
      .then((response) => response.json())
      .then((response) => setActProfesores((v) => !v));
  };

  const handleCloseForm = () => {
    setNombreFB({ ...nombreFB, text: '', color: '' });
    setTelefonoFB({ ...telefonoFB, text: '', color: '' });
    setActive(false);
  };

  return (
    <>
      {active && (
        <div id="profesor-add-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Nuevo Profesor</h2>
          <form action="" id="alumno-add-form" onSubmit={submitProfesorForm}>
            <div className="inputlabel">
              <InputReComponent
                type={'text'}
                name={"nombre"}
                className={'profesor-add-form-input'}
                placeholder={'Nombre'}
                onChangeFuncion={(e) => handleChangeName(e, 'profesor-add-form-addBtn', 'telefonoInput', true)}
              />
              {console.log(feedback.nombreFB)}
              <p className="feedbackInline" style={{ color: feedback.nombreFB.color }}>
                {nombreFB.text}
                {feedback.nombreFB.text}
              </p>
            </div>
            <div className="inputlabel">
              <InputComponent
                type={'text'}
                id={'telefonoInput'}
                className={'profesor-add-form-input'}
                placeholder={'Telefono'}
                onChangeFuncion={handleChangePhone}
                deshabilitado={true}
                min={7}
                max={12}
              />
              <p className="feedbackInline" style={{ color: telefonoFB.color }}>
                {telefonoFB.text}
              </p>
            </div>
            <button disabled id="profesor-add-form-addBtn" type="sumbit">
              <FontAwesomeIcon id="canchas-add-form-btn" icon={faPlusCircle} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AgregarProfesor;
