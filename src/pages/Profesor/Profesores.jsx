import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { checkExistenceIn, ordenarPorNombre } from '../../components/Utils/Functions' 

import NavBar from '../NavBar'
import AgregarProfesor from '../../components/Profesor/AgregarProfesor'
import ProfesoresList from '../../components/Profesor/ProfesoresList'
import LoaderSpinner from '../../components/LoaderSpinner'

import '../../styles/profesores.css'

const Profesores = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const feedbackStructure = {
    text: '',
    color: ''
  }

  // Activo y profesores en detalle (particular)
  const [active, setActive] = useState(false);
  const [profeDetail, setProfeDetail] = useState({});

  const [profesoresLoader, setProfesoresLoader] = useState(true); // Spinner

  //para actualizar los profesores
  const [profesores, setProfesores] = useState([]);
  const [actProfesores, setActProfesores] = useState(false);
  
  // Agregar profesor
  const [profesorForm, setProfesorForm] = useState({
    nombre: '',
    telefono: '',
    email: ''
  })

  const [feedback, setFeedback] = useState({
    nombreFB: feedbackStructure,
    telefonoFB: feedbackStructure
  })

  const handleChangeName = (e, submitButtonName, telefonoInputName, checkDisabled) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const word = e.target.value.split(' ').join('');
    
    const nombreProfesor = e.target.value;
    const submitBtn = document.getElementById(submitButtonName)
    const shouldIStartDisabled = checkDisabled; // Con esto pregunto, deberia considerar este valor/input?

    //validar que el nombrte sea solo texto y que no exista repetidos
    setProfesorForm({...profesorForm, [e.target.name]: nombreProfesor})
    console.log(profesorForm)
    const nextInput = document.getElementById(telefonoInputName);

    if (nombreProfesor === '') {
      setFeedback({...feedback, nombreFB: feedbackStructure})
      console.log(feedback)
      if (shouldIStartDisabled){
        nextInput.disabled = true;
        submitBtn.disabled = true;
      }
    } else {
      //Cumple las expectativas de ser un nombre
      if (pattern.test(word)) {
        if (checkExistenceIn(profesores, "nombre", nombreProfesor)) {
          setFeedback({...feedback, nombreFB: {...feedback.nombreFB, text: 'El nombre de profesor es correcto', color: '#7CBD1E'}})
          shouldIStartDisabled && (nextInput.disabled = false);
        } else {
          setFeedback({...feedback, nombreFB: {...feedback.nombreFB, text: 'El nombre de profesor ya existe', color: '#CC3636'}})
          if (shouldIStartDisabled) {
            nextInput.disabled = true;
            submitBtn.disabled = true;
          } 
        }
      } else setFeedback({...feedback, nombreFB: {...feedback.nombreFB, text: 'Escriba un nombre de profesor sin numeros', color: '#CC3636'}})
    }
  };    

  useEffect(() => {
  const requestOptions = {
    method: 'GET',
  };
  fetch(`${URL_BASE}profesores`, requestOptions)
    .then((response) => response.json())
    .then((data) => setProfesores(ordenarPorNombre(data)))
    .then(() => setProfesoresLoader(() => false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actProfesores]);

  return (
    <div id='profesores-component'>
        <NavBar title={'Profesores'} setSesion={setSesion}/>
        <div id='profesores-component-mainContent'>
            <button id='canchas-add-btn' onClick={() => {setActive(true)}}>
              <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
            
            <AgregarProfesor 
              active={active} setActive={setActive} setProfesores={setProfesores}
              profesores={profesores} setActProfesores={setActProfesores} setProfesoresLoader={setProfesoresLoader}
              handleChangeName={handleChangeName} feedback={feedback}
            />
            
            {profesoresLoader ?  
              <LoaderSpinner active={profesoresLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
            :
              <ProfesoresList profesores={profesores} profeDetail={profeDetail} setProfeDetail={setProfeDetail}/>
        }
        </div>
    </div>
  )
}

export default Profesores