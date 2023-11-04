import '../../styles/movimiento/movimientoTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputComponent from '../Utils/InputComponent';

export const MovimientoTable = () => {
  return (
    <div className="container" style={{backgroundColor:'white', paddingLeft:'5px', paddingRight:'5px', maxHeight: '60vh',
                                      overflowY: 'scroll'}}>
      <table className="movimiento-table" style={{marginBottom:'5px', position:'relative'}}>
        <thead className='table-head' style={{position:'sticky',top: '0'}}>
          <tr>
            <th>Día</th>
            <th>Concepto</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th style={{width:'15em'}}>
              <div className="movimiento-searchbar">
                <FontAwesomeIcon className="movimiento-magnify-icon" icon={faMagnifyingGlass}/>
                <InputComponent type={'text'} placeholder={'Buscar por descripcion'}/>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        <tr style={{height:'8px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Juan Cruz Gutierrez</td>
            <td className='monto-td'>$5000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Jhon Doe</td>
            <td className='monto-td'>$1000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Donacion</td>
            <td>Donacion de Levy</td>
            <td className='monto-td'>$3000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Matias Adorno</td>
            <td className='monto-td'>$5000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Diego Gonzales</td>
            <td className='monto-td'>$5000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Jhon Doe</td>
            <td className='monto-td'>$1000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Jhon Doe</td>
            <td className='monto-td'>$1000</td>
            <td></td>
          </tr>
          <tr style={{height:'5px'}}/>
          <tr className='table-row'>
            <td>30/10/23</td>
            <td>Alumno</td>
            <td>Jhon Doe</td>
            <td className='monto-td'>$1000</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}