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
import { Pagos } from './pages/Pagos/Pagos';

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
          <Route path="/pagos" element={<Pagos setSesion={setSesion} />}/>
          <Route path="/nuevaReserva" element={<Reservas setSesion={setSesion} />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
