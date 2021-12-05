import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/menu/Navbar";
import inicio from './Components/Formmerca/FormRegistrarMerca';
import  Login  from './Screen/Login'
import inventario from './Screen/Inventario';
import admin from './Screen/FormRegistrarAdmin'
import '../src/assets/css/App.css';
import './Utils/firebase';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Components/authContext/AuthContext';
import { PrivateRoute } from './Components/authContext/PrivateRoute';

function App() {
  return (
    <>
      <Router>
      <AuthProvider>
      <Navbar />
        <Switch>
        <Route exact path='/login' component={Login}/>
          <PrivateRoute path='/' exact component={inicio}/>
          <PrivateRoute path='/admin' exact component={admin}/>
          <PrivateRoute   exact path='/inventario' component={inventario}/>
        </Switch>
        </AuthProvider>
      </Router>
      <ToastContainer/>
    </>

    
  );
}

export default App;
