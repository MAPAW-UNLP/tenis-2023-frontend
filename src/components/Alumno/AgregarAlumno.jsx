import React from 'react';
//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
//Components
import InputComponent from '../InputComponent';
import FeedbackText from '../FeedbackText';
import NacimientoComponent from '../NacimientoComponent';

const AgregarAlumno = ({
  active,
  setActive,
  setAlumnos,
  alumnos,
  setActAlumnos,
  setAlumnosLoader,
}) => {
  const URL_BASE = `http://localhost:8083/api/`;
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nacimiento, setNacimiento] = useState('');

  //feedback del input
  const [nombreFB, setNombreFB] = useState({ text: '', color: '' });
  const [telefonoFB, setTelefonoFB] = useState({ text: '', color: '' });

  //estos para la fecha de nacimiento personalizada
  const handleChangeName = (e) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const word = e.target.value.split(' ').join('');
    const submitBtn = document.getElementById('alumno-add-form-addBtn');

    //validar que el nombrte sea solo texto y que no exista repetidos
    setNombre(e.target.value);
    const nextInput = document.getElementById('telefonotinput');
    if (e.target.value === '') {
      setNombreFB({ ...nombreFB, text: '', color: '' });
      nextInput.disabled = true;
      submitBtn.disabled = true;
    } else {
      //Cumple las expectativas de ser un nombre
      if (pattern.test(word)) {
        if (
          alumnos
            .map((each) => each.nombre.toUpperCase())
            .indexOf(e.target.value.toUpperCase()) === -1
        ) {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de alumno es correcto',
            color: '#7CBD1E',
          });
          nextInput.disabled = false;
        } else {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de usuario ya existe',
            color: '#CC3636',
          });
          nextInput.disabled = true;
          submitBtn.disabled = true;
        }
      } else {
        setNombreFB({
          ...nombreFB,
          text: 'Escriba un nombre de usuario sin numeros',
          color: '#CC3636',
        });
      }
    }
  };

  const handleChangePhone = (e) => {
    const pattern = '^[0-9]+$';
    const tel = e.target.value;
    setTelefono(tel);
    const submitBtn = document.getElementById('alumno-add-form-addBtn');

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

  const handlePickBirth = (e) => {
    //cambiar fotmato fecha de nacimiento
    const fechaAdaptada = e.target.value.split('-').join('');
    setNacimiento(fechaAdaptada);
  };

  const submitAlumnoForm = (e) => {
    e.preventDefault();
    console.log(nacimiento);
    setNombreFB({ ...nombreFB, text: '', color: '' });
    setTelefonoFB({ ...telefonoFB, text: '', color: '' });
    setNacimiento('');
    setAlumnosLoader((prevValue) => !prevValue);
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombre,
        telefono: telefono,
        fechanac: nacimiento,
        esalumno: true,
      }),
    };

    fetch(`${URL_BASE}persona`, requestOptions)
      .then((response) => response.json())
      .then((response) => setActAlumnos((v) => !v));
  };

  const handleCloseForm = () => {
    setActive(false);
  };
  return (
    <>
      {active && (
        <div id="alumno-add-component">
          <button id="close-alumno-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Nuevo Alumno</h2>
          <form action="" id="alumno-add-form" onSubmit={submitAlumnoForm}>
            <div className="inputlabel">
              <InputComponent
                type={'text'}
                className={'alumno-add-form-input'}
                placeholder={'Nombre'}
                onChangeFuncion={handleChangeName}
              />
              <p className="feedbackInline" style={{ color: nombreFB.color }}>
                {nombreFB.text}
              </p>
            </div>
            <div className="inputlabel">
              <InputComponent
                type={'text'}
                id="telefonotinput"
                className={'alumno-add-form-input'}
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
            <NacimientoComponent setNacimiento={setNacimiento} />
            <button id="alumno-add-form-addBtn" type="sumbit" disabled>
              <FontAwesomeIcon id="canchas-add-form-btn" icon={faPlusCircle} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AgregarAlumno;
