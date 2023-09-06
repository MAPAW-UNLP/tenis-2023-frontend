import React, { useState } from 'react'
import NavBar from './NavBar'
import '../styles/canchas.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

//Components
import CanchasAddForm from '../components/CanchasAddForm'
import CanchasList from '../components/CanchasList'
import LoaderSpinner from '../components/LoaderSpinner'

const Canchas = ({canchas, setActCanchas, activedLoader, setActivedLoader, setSesion  }) => {

  //>Ahora provisorio. Despues llamar a la api y cargar
  
  const [actived, setActived] = useState(false);
  

  const handleactivateForm = () =>{
    setActived((actived) => true);
  }

  
  
  return (
    <div id='canchas-component'>
      <NavBar title={'Canchas'} setSesion={setSesion}/>
       <LoaderSpinner active={activedLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
      <div id='canchas-info'>
        <button id='canchas-add-btn' onClick={handleactivateForm}> <FontAwesomeIcon icon={faPlusCircle}/></button>
        <CanchasAddForm actived={actived}   setActived={setActived}  canchas={canchas} setActivedLoader={setActivedLoader} setActCanchas={setActCanchas}/>
        <CanchasList canchas={canchas}/>
      </div>
     
    </div>
  )
}

export default Canchas