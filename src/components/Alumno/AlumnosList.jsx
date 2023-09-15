import React, { useState, useEffect } from 'react';
//components
import Alumno from '../Alumno';
import AlumnoDetail from '../AlumnoDetail';
//Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const AlumnosList = ({ alumnos }) => {
  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos);
  const [activeDetail, setActiveDetail] = useState(false);
  const [actAlu, setActAlu] = useState('');
  const [aluDetail, setAluDetail] = useState({});
  const URL_BASE = `http://localhost:8083/api/`;

  const handleChangeSearchAlumnno = (e) => {
    const Posibles = alumnos.filter((a) =>
      a.nombre.toUpperCase().includes(e.target.value.toUpperCase())
    );
    if (e.target.value === '') {
      setAlumnosFiltrados(alumnos);
    } else {
      setAlumnosFiltrados(Posibles);
    }
  };

  useEffect(() => {
    setAlumnosFiltrados(alumnos);
  }, [alumnos]);

  useEffect(() => {
    if (actAlu !== '') {
      fetch(`${URL_BASE}persona?personaId=${actAlu.id}`)
        .then((response) => response.json())
        .then((data) => setAluDetail(data))
        .then((response) => setActiveDetail(true));
    }
  }, [actAlu]);

  return (
    <div id="alumnos-list-component">
      <AlumnoDetail
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
        aluDetail={aluDetail}
        setAluDetail={setAluDetail}
        actAlu={actAlu}
        setActAlu={setActAlu}
        alumnos={alumnos}
      />
      <div id="alumnos-list-options">
        <p>Nombre </p>
        <p>Telefono</p>
        <p>Nacimiento</p>
        <div id="alumnos-searchbar">
          <FontAwesomeIcon
            id="magnify-icon"
            icon={faMagnifyingGlass}
          ></FontAwesomeIcon>
          <input
            type="text"
            name=""
            id=""
            placeholder="Busca un alumno"
            onChange={handleChangeSearchAlumnno}
          />
        </div>
      </div>
      <div id="alumnos-list">
        {alumnosFiltrados.map((a) => (
          <Alumno key={a.nombre} info={a} setActAlu={setActAlu}></Alumno>
        ))}
      </div>
    </div>
  );
};

export default AlumnosList;
