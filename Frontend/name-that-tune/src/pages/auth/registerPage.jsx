import React from 'react'

function registerPage() {
  return (
    <div className="signup">
      <Link to="./" className="back_arrow">
        <i className="fa fa-long-arrow-left"></i>
      </Link>
      <div className="signup_area">
        <div className="signup_main">Create Account</div>
        <form method="post" action="">
          <ul className="signup_list">
            <li className="dob">
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
              {/* <a></a> */}
              <div className="before_text">Birthday</div>
            </li>
            <li className="gender ">
              <div className="radio_button bg_signup orangeshade box-shadow">
                <ul className="list-inline">
                  <li>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                    />
                    <label for="male">Male</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                    />
                    <label for="female">Female</label>
                  </li>
                </ul>
                <div className="before_text">Gender</div>
              </div>
            </li>
            <li className="location">
              <select className="bg_signup">
                <option>Select Location</option>
                <option>Select Location</option>
                <option>Select Location</option>
              </select>
              <div className="before_text">Location</div>
            </li>
            <li className="signup_username">
              <input
                type="text"
                name=""
                className=""
                name="signup_username"
              />
              <div className="before_text">username</div>
            </li>
          </ul>
          <div className="col-md-12 text-center">
            <Link to="./game/lobby" className="btn-black">
              Signup
               </Link>

          </div>
        </form>
      </div>
    </div>
  )
}

export default registerPage
