import React, {useState} from 'react'

//font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
//components
import NavBar from './NavBar'
import AgregarProfesor from '../components/AgregarProfesor'
import ProfesoresList from '../components/ProfesoresList'
import LoaderSpinner from '../components/LoaderSpinner'
//styles
import '../styles/profesores.css'
const Profesores = ({actProfesores, setActProfesores, profesores, setProfesores, setProfesoresLoader, profesoresLoader, setSesion}) => {

    const [active, setActive] = useState(false);
    const [profeDetail, setProfeDetail] = useState({});

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