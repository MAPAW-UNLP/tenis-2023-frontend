import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Canchas } from './pages/Cancha/Canchas';
import { Reservas } from './pages/Reserva/Reservas';
import Alumnos from './pages/Alumno/Alumnos';
import { Profesores } from './pages/Profesor/Profesores';
import { Cobros } from './pages/Cobros/Cobros';
import CrearClase from './pages/CrearClase';
import SuspencionClase from './pages/AusenciasSuspenciones/SuspencionClase';
import PeriodoAusencia from './pages/AusenciasSuspenciones/PeriodoAusencia';
import SolicitudesSuspencion from './pages/AusenciasSuspenciones/SolicitudesSuspencion';
import SolicitudesAusencias from './pages/AusenciasSuspenciones/SolicitudesAusencias';
import Ausencias from './pages/AusenciasSuspenciones/Ausencias'

//VarianteHome
import HomeVariant from './pages/Reserva/HomeVariant';

//Style
import './styles/App.css';

//routes react
import { Routes, Route } from 'react-router-dom';


function App() {
  //para la sesion
  const navigate = useNavigate();
  const [sesion, setSesion] = useState('');

  //sesion Effect D:
  useEffect(() => {
    const user = localStorage.getItem('sesion');
    if (user === '') {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesion]);

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Login setSesion={setSesion} />} />
          <Route path="/inicio" element={<Home setSesion={setSesion} />} />
          <Route path="/reservas" element={<HomeVariant setSesion={setSesion} />} />
          <Route path="/canchas" element={<Canchas setSesion={setSesion} />} />
          <Route path="/alumnos" element={<Alumnos setSesion={setSesion} />}/>
          <Route path="/profesores" element={<Profesores setSesion={setSesion} />}/>
          <Route path="/cobros" element={<Cobros setSesion={setSesion} />}/>
          <Route path="/nuevaReserva" element={<Reservas setSesion={setSesion} />}/>
          <Route path="/crearClase" element={<CrearClase setSesion={setSesion} />}/>
          <Route path="/periodoAusencia" element={<PeriodoAusencia setSesion={setSesion} />}/>
          <Route path="/suspencionClase" element={<SuspencionClase setSesion={setSesion} />}/>
          <Route path="/misSolicitudesSuspencion" element={<SolicitudesSuspencion setSesion={setSesion} />}/>
          <Route path="/misSolicitudesAusencia" element={<SolicitudesAusencias setSesion={setSesion} />}/>
          <Route path="/ausencias" element={<Ausencias setSesion={setSesion} />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
