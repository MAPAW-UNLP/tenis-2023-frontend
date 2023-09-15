import React, { useState, useEffect } from 'react';
import InputComponent from './Utils/InputComponent';
import Pago from './Pago';
import PagoDetail from './PagoDetail';
//Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const PagosList = ({ pagos }) => {
  const [activeDetail, setActiveDetail] = useState(false);
  const [actUser, setActUser] = useState('');
  const [pagosActUser, setPagosActUser] = useState();
  const URL_BASE = `http://localhost:8083/api/`;

  useEffect(() => {
    if (actUser !== '') {
      fetch(`${URL_BASE}pagos_por_persona?personaId=${actUser.id}`)
        .then((response) => response.json())

        .then((data) => setPagosActUser(data))
        .then((response) => setActiveDetail(true));
    }
  }, [actUser]);

  return (
    <div id="pagos-list-component">
      <PagoDetail
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
        pagosActUser={pagosActUser}
        actUser={actUser}
      />
      <div id="pagos-list-options">
        <p>Alumno</p>
        <p>Fecha</p>
        <p>Tipo de reserva</p>
        <p>Creditos</p>
      </div>
      <div id="pagos-list">
        {pagos.map((pago, index) => (
          <Pago key={index} info={pago} setActUser={setActUser} />
        ))}
      </div>
    </div>
  );
};

export default PagosList;
