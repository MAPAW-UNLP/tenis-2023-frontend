import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Components
import Login from './pages/Login';
import Home from './pages/Home';
import Canchas from './pages/Cancha/Canchas';
import Reservas from './pages/Reservas';
import Alumnos from './pages/Alumno/Alumnos';
import Profesores from './pages/Profesores';
import Pagos from './pages/Pagos';
//VarianteHome
import HomeV from './pages/HomeVariant';

//Style
import './styles/App.css';

//routes react
import { Routes, Route } from 'react-router-dom';

function App() {
  //para la sesion
  const navigate = useNavigate();
  const [sesion, setSesion] = useState('');

  //Todo esto podría ir a la store global:
  // const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [pagos, setPagos] = useState([]);

  // const [actCanchas, setActCanchas] = useState(false);
  const [actReservas, setActReservas] = useState(false);
  const [actPagos, setActPagos] = useState(false);
  /*  */
  /* Loaders */
  const [activedLoader, setActivedLoader] = useState(false);
  const [reservasLoader, setReservasLoader] = useState(false);
  // const [alumnosLoader, setAlumnosLoader] = useState(false);
  const [profesoresLoader, setProfesoresLoader] = useState(false);

  //para actualizar los alumnos
  // const [alumnos, setAlumnos] = useState([]);
  // const [actAlumnos, setActAlumnos] = useState(false);

  //para actualizar los profesores
  const [profesores, setProfesores] = useState([]);
  const [actProfesores, setActProfesores] = useState(false);

  const URL_BASE = `http://localhost:8083/api/`;

  const ordenarPorNombre = (datos) => {
    return datos.sort(function (a, b) {
      if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  //sesion Effect D:
  useEffect(() => {
    const user = localStorage.getItem('sesion');
    if (user === '') {
      navigate('/');
    }
  }, [sesion]);

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //   };
  //   fetch(`${URL_BASE}canchas`, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setCanchas(data.detail))
  //     .then((response) => setActivedLoader((v) => false)); //siempre aca da false
  //   /* Desactivar spinner */
  // }, [actCanchas]);

  //Con las reservas
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}reservas`, requestOptions)
      .then(setReservasLoader(true))
      .then((response) => response.json())
      .then((data) => setReservas(data.detail))
      .then((response) => setReservasLoader((v) => false));
    /* Desactivar Spinner */
  }, [actReservas]);

  //get de los alumnos
  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //   };
  //   fetch(`${URL_BASE}alumnos`, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
  //     .then((response) => setAlumnosLoader((v) => false));

  //   /* Desactivar spinner */
  // }, [actAlumnos]);

  //get Profesores
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}profesores`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProfesores(ordenarPorNombre(data)))
      .then((response) => setProfesoresLoader((v) => false));

    /* Desactivar spinner */
  }, [actProfesores]);

  //fet pagos
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setPagos(data));
    /* Desactivar spinner */
  }, [actPagos]);

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Login setSesion={setSesion} />}></Route>
          <Route
            path="/inicio"
            element={<Home setSesion={setSesion} />}
          ></Route>
          <Route
            path="/reservas"
            element={
              <HomeV
                canchas={canchas}
                reservas={reservas}
                reservasLoader={reservasLoader}
                setSesion={setSesion}
                alumnos={alumnos}
                profesores={profesores}
                setActReservas={setActReservas}
              />
            }
          ></Route>
          <Route
            path="/canchas"
            element={
              <Canchas
                canchas={canchas}
                setActCanchas={setActCanchas}
                activedLoader={activedLoader}
                setActivedLoader={setActivedLoader}
                setSesion={setSesion}
              />
            }
          ></Route>
          <Route
            path="/alumnos"
            element={
              <Alumnos
                actAlumnos={actAlumnos}
                setActAlumnos={setActAlumnos}
                alumnos={alumnos}
                setAlumnos={setAlumnos}
                setAlumnosLoader={setAlumnosLoader}
                alumnosLoader={alumnosLoader}
                setSesion={setSesion}
              />
            }
          ></Route>
          <Route
            path="/profesores"
            element={
              <Profesores
                actProfesores={actProfesores}
                setActProfesores={setActProfesores}
                profesores={profesores}
                setProfesores={setProfesores}
                setProfesoresLoader={setProfesoresLoader}
                profesoresLoader={profesoresLoader}
                setSesion={setSesion}
              />
            }
          ></Route>
          <Route
            path="/pagos"
            element={
              <Pagos
                pagos={pagos}
                actPagos={actPagos}
                setActPagos={setActPagos}
                setPagos={setPagos}
                alumnos={alumnos}
                setSesion={setSesion}
              />
            }
          />
          <Route
            path="/nuevaReserva"
            element={
              <Reservas
                canchas={canchas}
                reservas={reservas}
                setActReservas={setActReservas}
                setReservasLoader={setReservasLoader}
                setSesion={setSesion}
                profesores={profesores}
                alumnos={alumnos}
                setProfesores={setProfesores}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
