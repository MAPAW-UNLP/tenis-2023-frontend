import React, { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import LoaderSpinner from '../../components/LoaderSpinner'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


import '../../styles/alumnos.css';
import '../../styles/alumnos/alumnos.css'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import { AlumnosList } from '../../components/AlumnoNew/AlumnosList';
import { AgregarAlumno } from '../../components/AlumnoNew/AgregarAlumno';

export const AlumnosNew = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  // Estado booleano para abrir formulario de creacion de nuevo alumno
  const [active, setActive] = useState(false);


  const [alumnos, setAlumnos] = useState([]);
  const [alumnosLoader, setAlumnosLoader] = useState(true); //Spinner
  const [loadingDetails, setLoadingDetails] = useState(false) // Spinner opciones

  const [actAlumnos, setActAlumnos] = useState(false);

  // Estado para el formulario de "Agregar Alumno"
  const [alumnoForm, setAlumnoForm] = useState({
    nombre: '',
    telefono: '',
    nacimiento: ''
  })

  // ALUMNO DETAIL
  const [activeDetail, setActiveDetail] = useState(false);
  const [actAlu, setActAlu] = useState('');
  const [aluDetail, setAluDetail] = useState({});

  // Alumno actual para ventana de cobros
  const [actUser, setActUser] = useState('');
  const [cobrosActUser, setCobrosActUser] = useState();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => { setAlumnos((data.length !== 0) ? ordenarPorNombre(data) : data) })
      .then(() => setAlumnosLoader((v) => false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlumnos]);

  // Este useEffect se dispara cuando traemos los datos para editar un alumno. Setea actAlu y mmuestra desplegable de edicion
  useEffect(() => {
    if (actAlu !== '') {
      fetch(`${URL_BASE}alumno?alumnoId=${actAlu.id}`)
        .then((response) => response.json())
        .then((data) => setAluDetail(data))
        .then(() => setActiveDetail(true))
        .then(() => setLoadingDetails(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlu]);

  // AGREGAR ALUMNO
  const handleSubmitAlumnoForm = (e) => {
    e.preventDefault();
    setAlumnosLoader((prevValue) => !prevValue);
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: alumnoForm.nombre,
        telefono: alumnoForm.telefono,
        fechaNac: alumnoForm.nacimiento,
      }),
    };

    fetch(`${URL_BASE}alumno`, requestOptions)
      .then((response) => response.json())
      .then(() => setActAlumnos((v) => !v))
      .then(clearState)
  };

  const clearState = () => {
    setAlumnoForm({
      nombre: '',
      telefono: '',
      nacimiento: ''
    })
  };

  const checkStudentExistence = (student) => {
    return alumnos.map((each) => each.nombre.toUpperCase()).indexOf(student.toUpperCase()) === -1
  }

  // Reseteo el formulario de COBRO
  const resetAlumnoForm = () => {
    setAlumnoForm({
      nombre: '',
      telefono: '',
      nacimiento: ''
    })
  }

  // Funcion para cerrar el formulario de creacion de Alumno
  const handleCloseForm = () => {
    resetAlumnoForm()
    setActive(false);
  };

  // Actualiza los datos del formulario para agregar un Alumno
  const handleChangeFormData = (e) => {
    setAlumnoForm({ ...alumnoForm, [e.target.name]: e.target.value });
  }
  return (
    <div id='alumnos-component'>
      <NavBar title={'Alumnos'} setSesion={setSesion} />
      <div id='alumnos-component-mainContent'>

        {/* Agregar alumno - Formulario flotante */}
        <GenericLargeButton title={"Crear nuevo alumno"} doSomething={() => setActive(true)} />
        <AgregarAlumno active={active} handleCloseForm={handleCloseForm} submitAlumnoForm={handleSubmitAlumnoForm}
          handleChangeFormData={handleChangeFormData} alumnoForm={alumnoForm} setAlumnoForm={setAlumnoForm}
          checkStudentExistence={checkStudentExistence} />

        {alumnosLoader ?
          <LoaderSpinner active={alumnosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <div className='container-new-alumnos-list' style={{ backgroundColor: '#ffffff' }}>
            <div className='table-head-alumnos'>
              <span style={{ fontSize: '1.8em' }}>Nombre</span>
              <div id="alumnos-searchbar" className='list-options-header' style={{ width: 'unset' }}>
                <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
                <input type="text" placeholder="Busca un alumno" />
              </div>
            </div>

            {/* Lista de alumnos */}
            <AlumnosList alumnos={alumnos} />
          </div>
        }
      </div>
    </div >
  )
}
