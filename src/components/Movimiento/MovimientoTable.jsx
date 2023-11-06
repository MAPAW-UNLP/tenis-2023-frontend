import '../../styles/movimiento/movimientoTable.css'
import {Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputComponent from '../Utils/InputComponent';

export const MovimientoTable = ({ movimientos }) => {
  return (
    <div className="container" style={{
      backgroundColor: 'white', paddingLeft: '5px', paddingRight: '5px', maxHeight: '60vh',
      overflowY: 'scroll'
    }}>
      <table className="movimiento-table" style={{ marginBottom: '5px', position: 'relative' }}>
        <thead className='table-head' style={{ position: 'sticky', top: '0' }}>
          <tr>
            <th>Día</th>
            <th>Concepto</th>
            <th style={{textAlign:'center'}}>Descripción</th>
            <th>Monto</th>
            <th style={{ width: '15em' }}>
              <div className="movimiento-searchbar">
                <FontAwesomeIcon className="movimiento-magnify-icon" icon={faMagnifyingGlass} />
                <InputComponent type={'text'} placeholder={'Buscar por descripcion'} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento) => (
              <Fragment key={movimiento.id}>
                <tr style={{ height: '8px' }} />
                <tr className='table-row'>
                  <td>{movimiento.fecha}</td>
                  <td>{movimiento.concepto_desc}</td>
                  <td>{movimiento.descripcion}</td>
                  <td className='monto-td'>${movimiento.monto}</td>
                  <td></td>
                </tr>
              </Fragment>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}