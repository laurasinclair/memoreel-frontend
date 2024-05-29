import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@context";
import authService from "../services/auth.service";
import loginStyles from "./styles/Login.module.sass";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorDescription = error.response
          ? error.response.data.message
          : error.message;
        setErrorMessage("❌ " + errorDescription);
      });
  };

  return (
    <>
      <div className={loginStyles.login}>
        <form onSubmit={handleLoginSubmit}>
          <fieldset>
            <label htmlFor="email" className="">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleEmail}
              className=""
              autoComplete="off"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
              className=""
              autoComplete="off"
            />
          </fieldset>

          <button type="submit" className="">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="">
          Don&apos;t have an account yet? <Link to={"/signup"}> Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
