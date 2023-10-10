import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alumno from './Alumno';

import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const AlumnosList = ({ alumnos, setActAlu }) => {
  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos);  

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

  useEffect(() => {
    setAlumnosFiltrados(alumnos);
  }, [alumnos]);

  return (
    <>
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
    </>
  );
};

export default AlumnosList;
