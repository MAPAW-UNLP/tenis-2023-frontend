import React, { useState, useEffect } from 'react';
import { Cobro } from './Cobro';
import { CobroDetail }  from './CobroDetail';

export const CobrosList = ({ cobros }) => {
  const [activeDetail, setActiveDetail] = useState(false);
  const [actUser, setActUser] = useState('');
  const [cobrosActUser, setCobrosActUser] = useState();
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

  return (
    <div id="cobros-list-component">
      <CobroDetail activeDetail={activeDetail} setActiveDetail={setActiveDetail} cobrosActUser={cobrosActUser} actUser={actUser}/>
      <div id="cobros-list-options">
        <p>Alumno</p>
        <p>Fecha</p>
        <p>Tipo de reserva</p>
        <p>Creditos</p>
      </div>
      <div id="cobros-list">
        {cobros.map((cobro, index) => (
          <Cobro key={index} info={cobro} setActUser={setActUser} />
        ))}
      </div>
    </div>
  );
};
