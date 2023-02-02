import React from "react";
// Components
import LoginForm from "../components/Login/LoginForm";
import Header from "../components/Header";
import Background from "../components/Background";

function Login() {
  return (
    <div className='isolate'>
      <Background />
      <Header />
      <LoginForm />
    </div>
  );
}

export default Login;
