import React from 'react'

function loginForm() {
    return (
        <div>
            <form action="" method="">
                <ul className="login_area list-unstyled">
                    <li className="username">
                        <input
                            type="text"
                            name=""
                            className="redshade box-shadow"
                            placeholder="john.doe@example.com"
                        />
                    </li>
                    <li className="password">
                        <input
                            type="password"
                            name=""
                            className="pswd_field"
                            placeholder="Password"
                        />
                    </li>
                </ul>
                <Link to="./join_room" className="btn btn-black btn_login">
                    Login
              </Link>

                <p className="signup_link">
                    Don’t have an account?
                <Link to="./register" className="link_signup">
                        Sign Up
                </Link>
                </p>
            </form>
        </div>
    )
}

export default loginForm
