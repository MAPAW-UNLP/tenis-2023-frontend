import React from 'react'

//components
import NavBar from './NavBar'
import HomeCard from '../components/HomeCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faUser, faCalendar,faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const Home = ({setSesion}) => {

  
  return (
    <>
      <NavBar title={'Inicio'} setSesion={setSesion} />
      <div id='home-content'>
        <HomeCard title={'Canchas'} descr={'Manejo de las cannchas del sistema'} Logo={<FontAwesomeIcon icon={faTableTennis}/>} color={'#EE82EE'} link="../canchas" nombreClase={'canchashc'}></HomeCard>
        <HomeCard title={'Alumnos'} descr={'Gestion de alumnos'} Logo={<FontAwesomeIcon icon={faUser}/>} color={'#ADD8E6'} link="../alumnos" nombreClase={'alumnoshc'}></HomeCard>
        <HomeCard title={'Reservas'} descr={'Reservación de alquiléres y clases'} Logo={<FontAwesomeIcon icon={faCalendar}/>} color={'#FFA500'} link="../reservas" nombreClase={'reservashc'}></HomeCard>
        <HomeCard title={'Profesores'} descr={'Gestión de profesores'} Logo={<FontAwesomeIcon icon={faUserTie}/>} color={'#BCEB3C'} link="../profesores" nombreClase={'profesoreshc'}></HomeCard>
        <HomeCard title={'Pagos'} descr={'Movimiento de dinero y manejo de pagos'} Logo={<FontAwesomeIcon icon={faDollarSign} />} color={'#94F5C5'} link="../pagos" nombreClase={'pagoshc'}></HomeCard>
      </div>
    </>
  )
}

export default Home