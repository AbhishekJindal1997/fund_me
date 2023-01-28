import React from "react";
// Components
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Background from "../components/Background";

function Login() {
  return (
    <>
      <div className='isolate bg-white'>
        <Background />
        <Header />
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
