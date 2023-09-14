import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import '../styles/canchas.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

//Components
import CanchasAddForm from '../components/Canchas/CanchasAddForm'
import CanchasList from '../components/CanchasList'
import LoaderSpinner from '../components/LoaderSpinner'

const Canchas = ({ setSesion  }) => {  
  const [actived, setActived] = useState(false);

  const [canchas, setCanchas] = useState([]);
  const [actCanchas, setActCanchas] = useState(false);
  const [activedLoader, setActivedLoader] = useState(false);

  const URL_BASE = `http://localhost:8083/api/`;

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}canchas`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCanchas(data.detail))
      .then((response) => setActivedLoader((v) => false)); //siempre aca da false
    /* Desactivar spinner */
  }, [actCanchas]);

  // Metodos auxiliares
  const handleactivateForm = () =>{
    setActived((actived) => true);
  }

  
  
  return (
    <div id='canchas-component'>
      <NavBar title={'Canchas'} setSesion={setSesion}/>
      <LoaderSpinner active={activedLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
      <div id='canchas-info'>
        <button id='canchas-add-btn' onClick={handleactivateForm}> <FontAwesomeIcon icon={faPlusCircle}/> </button>
        <CanchasAddForm 
          actived={actived}   
          setActived={setActived}  
          canchas={canchas} 
          setActivedLoader={setActivedLoader} 
          setActCanchas={setActCanchas}
        />
        <CanchasList canchas={canchas}/>
      </div>
    </div>
  )
}

export default Canchas