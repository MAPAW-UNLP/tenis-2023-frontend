import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'

import '../../styles/ajustes/ajustes.css'

export const Ajustes = ({ setSesion }) => {
  const navigate = useNavigate()
  const handleRedirect = (link) => {
    navigate(link)
  }
  return (
    <>
      <NavBar title={'Ajustes'} setSesion={setSesion} />
      <div className='container-ajustes'>
        <div className='table-head-ajustes'>Valores</div>
        <div className='container-table-ajustes'>
          <div style={{display:'flex', justifyContent:'space-around', backgroundColor:'#78a1ca', padding:'.6em',
                      borderRadius:'1em'}}>
            <span>Tipo de clase</span>
            <span>Valor</span>
          </div>

          <div style={{display:'flex', justifyContent:'space-around', padding:'.6em', borderRadius:'1em'}}>
            <span>Individual</span>
            <span style={{width:'3em'}}>$1000</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-around', padding:'.6em', borderRadius:'1em'}}>
            <span>Grupal</span>
            <span>$1000</span>
          </div>

          <div style={{display:'flex', justifyContent:'space-around', backgroundColor:'#78a1ca', padding:'.6em',
                      borderRadius:'1em', marginTop:'1em'}}>
            <span>Profesor</span>
            <span>Valor de hora</span>
          </div>

          <div style={{display:'flex', justifyContent:'space-around', padding:'.6em', borderRadius:'1em'}}>
            <span>Grupal</span>
            <span>$1000</span>
          </div>

        </div>
      </div>
    </>
  )
}
