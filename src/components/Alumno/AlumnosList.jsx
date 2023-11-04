import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CobroDetail } from './CobroDetail';
import Alumno from './Alumno';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AlumnosList = ({ alumnos, setActAlu }) => {
  const [activeDetail, setActiveDetail] = useState(false);
  const [cobrosActUser, setCobrosActUser] = useState();
  const [actUser, setActUser] = useState('');

  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos);  
  
  const URL_BASE = `http://localhost:8083/api/`;

  useEffect(() => {
    if (actUser !== '') {
      fetch(`${URL_BASE}pagos_por_persona?personaId=${actUser.id}`)
        .then((response) => response.json())
        .then((data) => setCobrosActUser(data))
        .then(() => setActiveDetail(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actUser]);

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
        <CobroDetail activeDetail={activeDetail} setActiveDetail={setActiveDetail} cobrosActUser={cobrosActUser} actUser={actUser}/>
        <p className='list-options-header'>Nombre </p>
        <p className='list-options-header'>Telefono</p>
        <p className='list-options-header'>Pagos</p>
        <div id="alumnos-searchbar" className='list-options-header'>
          <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass}/>
          <input type="text" placeholder="Busca un alumno" onChange={handleChangeSearchAlumnno}/>
        </div>
      </div>

      <div id="alumnos-list">
        {alumnosFiltrados.map((a) => (
          <Alumno key={a.nombre} info={a} setActAlu={setActAlu} setActUser={setActUser} />
        ))}
      </div>
    </>
  );
};

export default AlumnosList;
