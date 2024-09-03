import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Home from './pages/Home';
import Login from './pages/Login';
import Map from './pages/Map';
import Register from './pages/Register';


function App() {
  return (
    

    <Router> {/* Tüm uygulamayı Router bileşeni ile sarıyoruz */}

      <div className="container">{/* Tüm içeriği sağdan ve soldan boşluk bırakacak şekilde hizalayacak ana konteyner */}

        <NavBar /> {/* Navigasyon çubuğunu (NavBar) ekliyoruz */}
        
        <header className="App-header">

          <Routes> {/* Routes bileşeni, Route bileşenlerini kontrol eder */}

            <Route path="/" element={<Home />} /> {/* Ana sayfa (Home) rotası */}
            <Route path="/map" element={<Map />} /> {/* Harita sayfası rotası */}
            <Route path="/events" element={<Events />} /> {/* Etkinlikler sayfası rotası */}
            <Route path="/contact" element={<Contact />} /> {/* İletişim sayfası rotası */}
            <Route path="/login" element={<Login />} /> {/* Giriş sayfası rotası */}
            <Route path="/register" element={<Register />} />

            
          </Routes>
        </header>
      </div>

    </Router>


  );
}



export default App;
