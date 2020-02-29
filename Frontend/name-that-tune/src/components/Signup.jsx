import React from 'react'
import { HashLink as Link } from "react-router-hash-link";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./css/style.css";
import "./css/signup.css";
import "./css/responsive.css";
import Axios from 'axios';
import CacheHandler from './interfaces/CacheHandler';
import sha256 from 'sha256';

const localhostplace = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const Signup = (props) => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  React.useEffect(() => {
    if(CacheHandler.verifyCache('logged-in'))
      props.history.push('/MainMenu');
  }, []);

  const formChange = (e) => {
    if (e.target.name === 'username')
      setUserName(e.target.value);
    if (e.target.name === 'password')
      setPassword(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${localhostplace}/api/signup`, {
        "id": userName,
        "password": sha256(password)
      });

      CacheHandler.setCache('logged-in', true);
      CacheHandler.setCache('username', userName);
      
      props.history.push('/MainMenu');

    } catch (err) {
      console.log(err);
      setError(<span style={{color: 'red', textAlign:'center'}}>Error Occured, Please Retry!</span>);
    }
  };

  return (
    <div className="signup">
      <Link to="./" className="back_arrow">
        <i className="fa fa-long-arrow-left"></i>
      </Link>
      <div className="signup_area">
        <div className="signup_main">Create Account</div>
        {error}
        <form style={{marginTop:'15px'}} onSubmit={submitForm} >
          <ul className="signup_list">
            <li className="signup_username">
              <input
                type="text"
                name="username"
                onChange={formChange}
                className=""
              />
              <div className="before_text">username</div>
            </li>
            <li className="signup_username">
              <input
                type="password"
                name="password"
                onChange={formChange}
                className=""
              />
              <div className="before_text">Password</div>
            </li>
          </ul>
          <div className="col-md-12 text-center">
            <button className="btn-black" type='submit'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup
