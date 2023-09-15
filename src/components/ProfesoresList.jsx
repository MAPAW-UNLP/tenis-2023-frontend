import React, { useState, useEffect } from 'react';
//components
import Profesor from './Profesor';
import ProfesorDetail from './ProfesorDetail';
import InputComponent from './Utils/InputComponent';
//Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const ProfesoresList = ({ profesores }) => {
  const [profesoresFiltrados, setProfesoresFiltrados] = useState(profesores);
  const [activeDetail, setActiveDetail] = useState(false);
  const [actProfe, setActProfe] = useState('');
  const [profeDetail, setProfeDetail] = useState({});
  const URL_BASE = `http://localhost:8083/api/`;

  const handleChangeSearchProfessor = (e) => {
    const Posibles = profesores.filter((a) =>
      a.nombre.toUpperCase().includes(e.target.value.toUpperCase())
    );
    if (e.target.value === '') {
      setProfesoresFiltrados(profesores);
    } else {
      setProfesoresFiltrados(Posibles);
    }
  };

  useEffect(() => {
    setProfesoresFiltrados(profesores);
  }, [profesores]);

  useEffect(() => {
    if (actProfe !== '') {
      fetch(`${URL_BASE}persona?personaId=${actProfe.id}`)
        .then((response) => response.json())
        .then((data) => setProfeDetail(data))
        .then((response) => setActiveDetail(true));
    }
  }, [actProfe]);

  return (
    <div id="profesores-list-component">
      <ProfesorDetail
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
        profeDetail={profeDetail}
        setProfeDetail={setProfeDetail}
        actProfe={actProfe}
        setActProfe={setActProfe}
        profesores={profesores}
      />
      <div id="profesores-list-options">
        <p>Nombre</p>
        <p>Telefono</p>
        <div id="profesores-searchbar">
          <FontAwesomeIcon
            id="magnify-icon"
            icon={faMagnifyingGlass}
          ></FontAwesomeIcon>
          <InputComponent
            type={'text'}
            placeholder={'Busca un profesor'}
            onChangeFuncion={handleChangeSearchProfessor}
          />
        </div>
      </div>
      <div id="profesores-list">
        {profesoresFiltrados.map((p) => (
          <Profesor key={p.id} info={p} setActProfe={setActProfe}></Profesor>
        ))}
      </div>
    </div>
  );
};

export default ProfesoresList;
