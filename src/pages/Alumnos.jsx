import React, {useState} from 'react'

//font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
//components
import NavBar from './NavBar'
import AgregarAlumno from '../components/AgregarAlumno'
import AlumnosList from '../components/AlumnosList'
import LoaderSpinner from '../components/LoaderSpinner'
//Styles 
import '../styles/alumnos.css'

const Users = ({actAlumnos, setActAlumnos, alumnos, setAlumnos, setAlumnosLoader, alumnosLoader, setSesion}) => {

  const [active, setActive] = useState(false);
  const [aluDetail, setAluDetail] = useState({});


  return (
    <div id='alumnos-component'>
      <NavBar title={'Alumnos'} setSesion={setSesion}></NavBar> 
      <LoaderSpinner active={alumnosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
      <div id='alumnos-component-mainContent'>
        <button id='canchas-add-btn' onClick={() => {setActive((active)=> true)}}> <FontAwesomeIcon icon={faPlusCircle}/></button>
        <AgregarAlumno active={active} setActive={setActive} setAlumnos={setAlumnos} alumnos={alumnos} setActAlumnos={setActAlumnos} setAlumnosLoader={setAlumnosLoader}/>
        { alumnos.length === 0 ?
          <div>...cargando</div>          
          :
          <AlumnosList alumnos={alumnos} aluDetail={aluDetail} setAluDetail={setAluDetail}/>
        }
      </div>
    </div>
  ) 
}

export default Users