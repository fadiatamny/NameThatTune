import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashLink as Link } from "react-router-hash-link";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/login.css";
import logo from "../components/images/logo.png";
import Axios from 'axios';
import CacheHandler from './interfaces/CacheHandler';

const testendpoint = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const Login = (props) => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [text, setText] = React.useState(<div>Log in <br />to continue.</div>);
  const red = { color: 'red' };

  React.useEffect(() => {
    if (CacheHandler.verifyCache('Admin'))
      props.history.push('/Dashboard');
    else if (CacheHandler.verifyCache('logged-in'))
      props.history.push('/MainMenu');
  }, []);

  const verify = async (e) => {
    if (e) { e.preventDefault(); }
    try {
      await Axios.post(`${endpoint}/api/login`, {
        "id": userName,
        "password": password
      });
      CacheHandler.setCache('logged-in', true);
      CacheHandler.setCache('username', userName);

      if (userName === 'admin') {
        CacheHandler.setCache('Admin', true);
        props.history.push('/Dashboard');
      } else {
        props.history.push('/MainMenu');
      }

    } catch (err) {
      console.log(err);
      setText(<div>Log in <br />to continue. <br /> <span style={red}>Please Retry!</span></div>);
    }
  };

  const formChange = (e) => {
    if (e.target.name === 'username')
      setUserName(e.target.value);
    if (e.target.name === 'password')
      setPassword(e.target.value);
  };

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
            {text}
          </div>
          <form onSubmit={verify}>
            <ul className="login_area list-unstyled">
              <li className="username">
                <input
                  type="text"
                  name="username"
                  onChange={formChange}
                  className="redshade box-shadow"
                  placeholder="example@email.com"
                />
              </li>
              <li className="password">
                <input
                  type="password"
                  name="password"
                  onChange={formChange}
                  className="pswd_field"
                  placeholder="Password"
                />
              </li>
            </ul>
            <button onClick={verify} className="btn btn-black btn_login">
              Login
              </button>

            <p className="signup_link">
              Don’t have an account?
                <Link to="./Signup" className="link_signup">
                Sign Up
                </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
