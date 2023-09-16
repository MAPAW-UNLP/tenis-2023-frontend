import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alumno from './Alumno';
import AlumnoDetail from './AlumnoDetail';

import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const AlumnosList = ({ alumnos }) => {
  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos);
  const [activeDetail, setActiveDetail] = useState(false);
  const [actAlu, setActAlu] = useState('');
  const [aluDetail, setAluDetail] = useState({});
  
  const URL_BASE = `http://localhost:8083/api/`;

  const handleChangeSearchAlumnno = (e) => {
    const posibles = alumnos.filter((a) =>
      a.nombre.toUpperCase().includes(e.target.value.toUpperCase())
    );
    if (e.target.value === '') {
      setAlumnosFiltrados(alumnos);
    } else {
      setAlumnosFiltrados(posibles);
    }
  };

  const checkStudentExistence = (student) => {
   return alumnos.map((each) => each.nombre.toUpperCase()).indexOf(student.toUpperCase()) === -1
  }

  useEffect(() => {
    setAlumnosFiltrados(alumnos);
  }, [alumnos]);

  // Este useEffect se dispara cuando traemos los datos para editar un alumno
  useEffect(() => {
    if (actAlu !== '') {
      fetch(`${URL_BASE}persona?personaId=${actAlu.id}`)
        .then((response) => response.json())
        .then((data) => setAluDetail(data))
        .then((response) => setActiveDetail(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlu]);

  return (
    <div id="alumnos-list-component">
      <AlumnoDetail
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
        setAluDetail={setAluDetail}
        actAlu={actAlu}
        alumnos={alumnos}
        checkStudentExistence={checkStudentExistence}
      />
      <div id="alumnos-list-options">
        <p>Nombre </p>
        <p>Telefono</p>
        <p>Nacimiento</p>
        <div id="alumnos-searchbar">
          <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass}/>
          <input type="text" placeholder="Busca un alumno" onChange={handleChangeSearchAlumnno}/>
        </div>
      </div>

      <div id="alumnos-list">
        {alumnosFiltrados.map((a) => (
          <Alumno key={a.nombre} info={a} setActAlu={setActAlu}/>
        ))}
      </div>
    </div>
  );
};

export default AlumnosList;
