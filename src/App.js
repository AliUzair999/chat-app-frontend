import './App.css';

import { Route, Routes, Navigate } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'

import Layout from './Views/Layout/Layout';
import Dashboard from './Views/Dashboard/Dashboard';
import Profile from './Views/Profile/Profile';
import RegisterAndLoginForm from './Views/RegisterAndLoginForm/RegisterAndLoginForm';
import Chat from './Views/Chat/Chat';
import Nothing from './Views/Nothing/Nothing';

import axios from 'axios';


function App() {
  axios.defaults.withCredentials = true;

  //PROTECTED ROUTING

  const userData = useSelector((state) => state.UserReducer)
  // console.log("redux userData", userData)
  const dispatch = useDispatch()

  const protectedRoute = (component) => {
    if (userData.user) {
      return component
    }
    else {
      return <Navigate to="/register" replace />
      // return <Login />

    }
  }

  const unProtectedRoute = (component) => {
    if (userData.user) {
      return <Navigate to="/chat" replace />
      // return <Dashboard userData={userData}/>
    }
    else {
      return component
    }
  }




  return (
    <div className="App">
      <header className="App-header">

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={unProtectedRoute(<RegisterAndLoginForm />)} />
            <Route path='register' element={unProtectedRoute(<RegisterAndLoginForm />)} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='chat' element={protectedRoute(<Chat />)} />
            <Route path='*' element={<Nothing />} />

          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
