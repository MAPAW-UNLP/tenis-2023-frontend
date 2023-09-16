import React, {useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../NavBar'
import AgregarAlumno from '../../components/Alumno/AgregarAlumno'
import AlumnosList from '../../components/Alumno/AlumnosList'
import LoaderSpinner from '../../components/LoaderSpinner'
 
import '../../styles/alumnos.css';

const Users = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [alumnos, setAlumnos] = useState([]);
  const [alumnosLoader, setAlumnosLoader] = useState(false);
  const [actAlumnos, setActAlumnos] = useState(false);

  const [alumnoForm, setAlumnoForm] = useState({
    nombre: '',
    telefono: '',
    nacimiento: ''
  })
  
  //feedback del input
  const [nombreFB, setNombreFB] = useState({ text: '', color: '' });
  const [telefonoFB, setTelefonoFB] = useState({ text: '', color: '' });

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

  // Metodos que son pasados a componente Agregar Alumno 
  const handleChangeName = (e) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const word = e.target.value.split(' ').join('');
    const submitBtn = document.getElementById('alumno-add-form-addBtn');

    console.log(alumnoForm)
    //validar que el nombre sea solo texto y que no exista repetidos
    setAlumnoForm({...alumnoForm, [e.target.name]: e.target.value});
    const nextInput = document.getElementById('telefonotinput');
    if (e.target.value === '') {
      setNombreFB({ ...nombreFB, text: '', color: '' });
      nextInput.disabled = true;
      submitBtn.disabled = true;
    } else {
      //Cumple las expectativas de ser un nombre
      if (pattern.test(word)) {
        if (
          alumnos
            .map((each) => each.nombre.toUpperCase())
            .indexOf(e.target.value.toUpperCase()) === -1
        ) {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de alumno es correcto',
            color: '#7CBD1E',
          });
          nextInput.disabled = false;
        } else {
          setNombreFB({
            ...nombreFB,
            text: 'El nombre de usuario ya existe',
            color: '#CC3636',
          });
          nextInput.disabled = true;
          submitBtn.disabled = true;
        }
      } else {
        setNombreFB({
          ...nombreFB,
          text: 'Escriba un nombre de usuario sin numeros',
          color: '#CC3636',
        });
      }
    }
  };

  const handleChangePhone = (e) => {
    const pattern = '^[0-9]+$';
    const tel = e.target.value;
    
    setAlumnoForm({...alumnoForm, [e.target.name]: e.target.value});
    const submitBtn = document.getElementById('alumno-add-form-addBtn');
    console.log(alumnoForm)
    if (tel === '') {
      setTelefonoFB({ ...telefonoFB, text: '', color: '' });
      submitBtn.disabled = true;
    } else {
      if (tel.match(pattern) != null && alumnoForm.telefono.length >= 6) {
        setTelefonoFB({
          ...telefonoFB,
          text: 'El nummero de telefono es correcto',
          color: '#7CBD1E',
        });
        submitBtn.disabled = false;
      } else {
        setTelefonoFB({
          ...telefonoFB,
          text: 'Solo numeros, minimo 7',
          color: '#CC3636',
        });
        submitBtn.disabled = true;
      }
    }
  };

  const handleSubmitAlumnoForm = (e) => {
    e.preventDefault();

    setNombreFB({ ...nombreFB, text: '', color: '' });
    setTelefonoFB({ ...telefonoFB, text: '', color: '' });
    
    setAlumnosLoader((prevValue) => !prevValue);
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: alumnoForm.nombre,
        telefono: alumnoForm.telefono,
        fechanac: alumnoForm.nacimiento,
        esalumno: true,
      }),
    };

    fetch(`${URL_BASE}persona`, requestOptions)
      .then((response) => response.json())
      .then((response) => setActAlumnos((v) => !v))
      .then(clearState)
  };
  
  const clearState = () => {
    setAlumnoForm({ 
      nombre: '',
      telefono: '',
      nacimiento: ''
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
          alumnos={alumnos} 
          setActAlumnos={setActAlumnos} 
          setAlumnosLoader={setAlumnosLoader}
          handleChangeName={handleChangeName}
          handleChangePhone={handleChangePhone}
          handleSubmitAlumnoForm={handleSubmitAlumnoForm}
          setAlumnoForm={setAlumnoForm}
          alumnoForm={alumnoForm}
        />
        {alumnos.length === 0 ? <div>...cargando</div>
         : <AlumnosList alumnos={alumnos} aluDetail={aluDetail} setAluDetail={setAluDetail}/>
        }
      </div>
    </div>
  ) 
}

export default Users