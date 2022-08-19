import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <>
    <Router>
      <Toaster 
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #333232',
            padding: '16px',
            color: '#dee0e4',
            background : "#333232"
          },
        }}/>
      <div className='flex flex-col overflow-hidden w-[100vw] h-[100vh]'>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </Router>
    
    </>
  );
}

export default App;
