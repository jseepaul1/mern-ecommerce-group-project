import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginAndRegistration from './Components/LoginAndRegistration/LoginAndRegistration';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<LoginAndRegistration />} path='/' />
          <Route element={<Dashboard />} path='/dashboard' />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
