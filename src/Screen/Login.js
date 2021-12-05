import React, { useState } from "react";
import "../assets/css/login.css";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Components/authContext/AuthContext";
import { toast } from "react-toastify";
export const Login = () => {
  const { login } = useAuth();
  const [correo, Setcorreo] = useState("");
  const [password, Setpassword] = useState("");
  const history = useHistory();

  const handleEmail = (e) => Setcorreo(e.target.value);
  const handlePassword = (e) => Setpassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(correo, password);
      history.push("/");
      toast("Bienvenido Administrador", { type: "success" });
    } catch (error) {
      toast("Introdujo mal el usuario o contraseña", { type: "error" });
    }
  };

  return (
    <>
      <div className="contenedor__body">
        <div className="contenedor__form-image">
          <div className="contenedor_formulario">
            <h1 className="titulo_login">Admin</h1>
            <form className="contenedor_formulario" onSubmit={handleSubmit}>
              <div className="form_inputs">
                <label className="textos_login-label">
                  Introdusca su correo
                </label>
                <input
                  type="email"
                  placeholder="correo@correo.com"
                  name="nombre"
                  className="input_login"
                  onChange={handleEmail}
                />
              </div>

              <div className="form_inputs">
                <label className="textos_login-label">
                  Introdusca su contraseña
                </label>
                <input
                  type="password"
                  placeholder="****************"
                  name="nombre"
                  className="input_login"
                  onChange={handlePassword}
                />
              </div>
              <input
                className="btn__login-entrar"
                type="submit"
                value="Log In"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
