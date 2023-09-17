import React, {useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { ordenarPorNombre } from '../../components/Utils/Functions' 

import NavBar from '../NavBar'
import AgregarProfesor from '../../components/Profesor/AgregarProfesor'
import ProfesoresList from '../../components/Profesor/ProfesoresList'
import LoaderSpinner from '../../components/LoaderSpinner'

import '../../styles/profesores.css'

const Profesores = ({ setSesion }) => {
    const URL_BASE = `http://localhost:8083/api/`;

    // Activo y profesores en detalle (particular)
    const [active, setActive] = useState(false);
    const [profeDetail, setProfeDetail] = useState({});

    // Loader
    const [profesoresLoader, setProfesoresLoader] = useState(false);

    //para actualizar los profesores
    const [profesores, setProfesores] = useState([]);
    const [actProfesores, setActProfesores] = useState(false);
    
    //get Profesores
    useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}profesores`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProfesores(ordenarPorNombre(data)))
      .then(() => setProfesoresLoader((v) => false));
    /* Desactivar spinner */
    }, [actProfesores]);

    return (
        <div id='profesores-component'>
            <NavBar title={'Profesores'} setSesion={setSesion}></NavBar>
            <LoaderSpinner active={profesoresLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
            <div id='profesores-component-mainContent'>
                <button id='canchas-add-btn' onClick={() => {setActive((active)=> true)}}> <FontAwesomeIcon icon={faPlusCircle}/> </button>
                <AgregarProfesor active={active} setActive={setActive} setProfesores={setProfesores} profesores={profesores} setActProfesores={setActProfesores} setProfesoresLoader={setProfesoresLoader} />
                {profesores.length === 0 ?  
                <div>...cargando</div>   
                :
                <ProfesoresList profesores={profesores} profeDetail={profeDetail} setProfeDetail={setProfeDetail}/>
            }
            </div>
        </div>
  )
}

export default Profesores