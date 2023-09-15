import React, {useState, useEffect} from 'react'

//font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
//components
import NavBar from '../NavBar'
import AgregarAlumno from '../../components/Alumno/AgregarAlumno'
import AlumnosList from '../../components/Alumno/AlumnosList'
import LoaderSpinner from '../../components/LoaderSpinner'
//Styles 
import '../../styles/alumnos.css';

const Users = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [alumnos, setAlumnos] = useState([]);
  const [alumnosLoader, setAlumnosLoader] = useState(false);
  const [actAlumnos, setActAlumnos] = useState(false);

  const [active, setActive] = useState(false);
  const [aluDetail, setAluDetail] = useState({});

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
      .then((response) => setAlumnosLoader((v) => false));

    /* Desactivar spinner */
  }, [actAlumnos]);

  // Metodo de ordenacion auxiliar
  const ordenarPorNombre = (datos) => {
    return datos.sort(function (a, b) {
      if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  return (
    <div id='alumnos-component'>
      <NavBar title={'Alumnos'} setSesion={setSesion}/> 
      <LoaderSpinner active={alumnosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
      <div id='alumnos-component-mainContent'>
        <button id='canchas-add-btn' onClick={() => {setActive((active)=> true)}}>
          <FontAwesomeIcon icon={faPlusCircle}/>
        </button>
        <AgregarAlumno 
          active={active} 
          setActive={setActive} 
          setAlumnos={setAlumnos} 
          alumnos={alumnos} 
          setActAlumnos={setActAlumnos} 
          setAlumnosLoader={setAlumnosLoader}
        />
        {alumnos.length === 0 ? <div>...cargando</div>
         : <AlumnosList alumnos={alumnos} aluDetail={aluDetail} setAluDetail={setAluDetail}/>
        }
      </div>
    </div>
  ) 
}

export default Users