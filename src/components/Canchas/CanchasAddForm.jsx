import React from 'react';
import { useState } from 'react';
//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//Components
import FeedbackText from '../FeedbackText';

const CanchasAddForm = ({
  actived,
  setActived,
  canchas,
  setActivedLoader,
  setActCanchas,
}) => {
  const URL_BASE = `http://localhost:8083/api/`;
  const [nombreCancha, setNombreCancha] = useState('');
  const [option, setOption] = useState('');

  //para el feedback
  const [feedBack, setFeedBack] = useState({
    text: '',
    color: '',
    backGroundColor: '',
    active: false,
  });

  const handleCanchaNameChange = (e) => {
    setNombreCancha(e.target.value);
    if (
      canchas
        .map((each) => each.nombre.toUpperCase())
        .indexOf(e.target.value.toUpperCase()) === -1
    ) {
      //pregunta se no existe una cancha con el mismo nombre
      const selectTipo = document.getElementById('cancha-add-form-select');
      if (e.target.value === '') {
        setFeedBack({
          ...feedBack,
          text: '',
          color: '',
          backGroundColor: '',
          active: false,
        });
        selectTipo.disabled = true;
      } else {
        setFeedBack({
          ...feedBack,
          text: 'El nombre de la cancha es correcto',
          color: '#F4F4F4',
          backGroundColor: '#7CBD1E',
          active: true,
        });
        selectTipo.disabled = false;
      }
    } else {
      //avisar mediante feedback que no puede haber una cancha repetida
      setFeedBack({
        ...feedBack,
        text: 'El nombre de la cancha es igual a una existente',
        color: '#F4F4F4',
        backGroundColor: '#CC3636',
        active: true,
      });
      const selectTipo = document.getElementById('cancha-add-form-select');
      setOption('');
      selectTipo.disabled = true;
      const addBtn = document.getElementById('cancha-add-form-addBtn');
      addBtn.disabled = true;
    }
  };

  const handleSelect = (e) => {
    setOption(e.target.value);
    const addBtn = document.getElementById('cancha-add-form-addBtn');
    e.target.value === ''
      ? (addBtn.disabled = true)
      : (addBtn.disabled = false);
  };

  const handleClickaddCourt = (e) => {
    //Aca meter un feedback de que la cancha se agrego correctamente
    e.preventDefault();
    setActivedLoader((prevValue) => !prevValue);
    setOption('');
    setNombreCancha('');
    setFeedBack({
      ...feedBack,
      text: '',
      color: '',
      backGroundColor: '',
      active: false,
    });
    setActived((actived) => false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ nombre: nombreCancha, tipo: option }),
    };
    fetch(`${URL_BASE}cancha`, requestOptions)
      .then((response) => response.json())
      .finally((response) => setActCanchas((v) => !v));
  };

  const handleCloseForm = () => {
    setOption('');
    setNombreCancha('');
    setActived(false);
    setFeedBack({ ...feedBack, text: '', color: '' });
  };

  return (
    <>
      {actived && (
        <div id="cancha-add-component">
          <div id="close-cancha-add-form" onClick={handleCloseForm}>
            x
          </div>
          <h2>Nueva cancha</h2>
          <form action="" id="cancha-add-form" onSubmit={handleClickaddCourt}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Ingresar nombre nueva Cancha"
              className="cancha-add-form-input"
              onChange={handleCanchaNameChange}
              value={nombreCancha}
            />
            <select
              name=""
              id="cancha-add-form-select"
              disabled
              onChange={handleSelect}
              value={option}
            >
              <option value="">Seleccionar Tipo</option>
              <option value="roja">Tierra batida</option>
              <option value="verde">Hierba</option>
              <option value="azul">Asfalto</option>
            </select>

            <FeedbackText
              text={feedBack.text}
              color={feedBack.color}
              backGroundColor={feedBack.backGroundColor}
              active={true}
            />

            <button id="cancha-add-form-addBtn" type="sumbit" disabled>
              <FontAwesomeIcon id="canchas-add-form-btn" icon={faPlusCircle} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CanchasAddForm;
