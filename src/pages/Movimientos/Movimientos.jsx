import React from 'react'

//components
import NavBar from '../Navbar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faUpLong, faDownLong, faScaleBalanced } from '@fortawesome/free-solid-svg-icons'
import '../../styles/movimientos.css'
export const Movimientos = ({ setSesion }) => {


  return (
    <>
      <NavBar title={'Movimientos'} setSesion={setSesion} />
      <div style={{
        width: '50%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        marginTop: '2em', marginBottom: '2em'
      }}>
        <div className="card cobros" style={{ marginRight: '1em' }}>
          <div className="image" style={{ backgroundColor: '#75ebb0', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faDollarSign} style={{ position: 'absolute', left: '32%', top: '0', bottom: '0', margin: 'auto' }} />
              <FontAwesomeIcon icon={faUpLong} style={{ position: 'absolute', right: '32%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <a href="#">
              <span className="title" style={{ color: '#75ebb0' }}>
                Cobros
              </span>
            </a>

            <p className="desc">
              Movimiento de ingreso de dinero
            </p>
          </div>
        </div>

        <div className="card pagos">
          <div className="image" style={{ backgroundColor: '#f5a694', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faDollarSign} style={{ position: 'absolute', left: '32%', top: '0', bottom: '0', margin: 'auto' }} />
              <FontAwesomeIcon icon={faDownLong} style={{ position: 'absolute', right: '32%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <a href="#">
              <span className="title" style={{ color: '#f5a694' }}>
                Pagos
              </span>
            </a>

            <p className="desc">
              Movimiento de egreso de dinero
            </p>
          </div>
        </div>

        <div className="card balance" style={{ marginTop: '1.2em', width: '38em', maxWidth: 'none' }}>
          <div className="image" style={{ backgroundColor: '#78a1ca', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faScaleBalanced} style={{ position: 'absolute', left: '0', right:'0', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <a href="#">
              <span className="title" style={{ color: '#78a1ca' }}>
                Balance general
              </span>
            </a>

            <p className="desc">
              Balance general de los movimientos
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
