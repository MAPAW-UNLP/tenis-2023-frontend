import React, { useState } from 'react';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

//Components
import FeedbackText from './FeedbackText';
import InputComponent from './InputComponent';
import NacimientoComponent from './NacimientoComponent';

const AlumnoDetail = ({
  activeDetail,
  setActiveDetail,
  aluDetail,
  setAluDetail,
  actAlu,
  setActAlu,
  alumnos,
}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nacimiento, setNacimiento] = useState(actAlu.fechanac);
  const [nacShow, setNacShow] = useState(actAlu.fechanac);

  //feedbackinline
  const [nombreFB, setNombreFB] = useState({ text: '', color: '' });
  const [telefonoFB, setTelefonoFB] = useState({ text: '', color: '' });

  const mostrarNacimientoApropiadamente = (f) => {
    if (f !== '') {
      const date = f.split('-');
      const fechaNacFormat = `${date[2]}/${date[1]}/${date[0]}`;
      setNacShow(fechaNacFormat);
      console.log(nacimiento);
    }
  };

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
          alumnos
            .map((each) => each.nombre.toUpperCase())
            .indexOf(e.target.value.toUpperCase()) === -1
        ) {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de alumno es correcto',
            color: '#7CBD1E',
          });
        } else {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de alumno ya existe',
            color: '#CC3636',
          });
        }
      } else {
        setNombreFB({
          ...nombreFB,
          text: 'Escriba un nombre de alumno sin numeros',
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

  const handlePickBirth = (e) => {
    //cambiar formato fecha de nacimiento
    const fechaAdaptada = e.target.value.split('-').join('');
    setNacimiento(fechaAdaptada);
  };

  const actualizarAlumno = () => {
    const URL_BASE = 'http://localhost:8083/api/';
    const nombreAlu = document.getElementById('nombreAlumno').value;
    const telAlu = document.getElementById('telefonoAlumno').value;
    const nacAlu = document.getElementById('nacimientoPicker').value;
    const data = {
      id: actAlu.id,
      esalumno: true,
    };
    nombreAlu == '' ? (data.nombre = actAlu.nombre) : (data.nombre = nombreAlu);
    telAlu == '' ? (data.telefono = actAlu.telefono) : (data.telefono = telAlu);
    nacAlu == '' ? (data.fechanac = actAlu.fechanac) : (data.fechanac = nacAlu);

    setActiveDetail(false);

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
    };

    fetch(`${URL_BASE}persona`, requestOptions)
      .then((response) => response.json())
      .then((response) => setAluDetail((v) => !v));
  };

  return (
    <>
      {activeDetail && (
        <div id="profesor-edit-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Editar Alumno</h2>
          {console.log(actAlu)}
          <div className="inputlabel">
            <InputComponent
              type={'text'}
              id={'nombreAlumno'}
              className={'profesor-add-form-input'}
              placeholder={actAlu.nombre}
              onChangeFuncion={handleChangeName}
            />
            <p className="feedbackInline" style={{ color: nombreFB.color }}>
              {nombreFB.text}
            </p>
          </div>
          <div className="inputlabel">
            <InputComponent
              type={'text'}
              id={'telefonoAlumno'}
              className={'profesor-add-form-input'}
              placeholder={actAlu.telefono}
              onChangeFuncion={handleChangePhone}
              min={7}
              max={12}
            />
            <p className="feedbackInline" style={{ color: telefonoFB.color }}>
              {telefonoFB.text}
            </p>
          </div>
          {console.log(nacShow)}
          <NacimientoComponent
            nacimiento={actAlu.fechanac}
            setNacimiento={setNacimiento}
          />
          <div id="clase-detail-btns">
            <button id="clase-detail-guardar" onClick={actualizarAlumno}>
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

export default AlumnoDetail;
