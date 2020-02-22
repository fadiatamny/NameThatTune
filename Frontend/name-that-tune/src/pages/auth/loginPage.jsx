import React from 'react'
import loginForm from '../../components/login/loginForm'

function login() {
  return (
    <div className="login">
      <div>
        <div className="col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-0 col-xs-12 col-xs-offset-0 pull-right">
          <div className="logo_main text-right">
            <img src={logo} />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-xs-12">
          <div className="welcomeback">Welcome !</div>
          <div className="login_text">
            Log in <br />
            to continue.
            </div>
            <loginForm/>
        </div>
      </div>
    </div>
  )
}

export default login
