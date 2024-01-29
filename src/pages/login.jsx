import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { Link } from "react-router-dom";





// get email/password 
// put into auth
// if authentification give coniditions based on what account is used     

//
{/* <Link to="/welcome" if>
                    <button className=" border-2 border-slate-800 text-slate-800 p-2 rounded-md m-4 hover:text-white hover:bg-slate-900 text-lg duration-300 relative top-0 hover:top-2">
                        Login
                    </button>
                </Link> */}

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlelogin = () => {
        if (email && password) {

            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // New page direct 
                console.log('Logged in');
                navigate('/welcome');
            })
                .catch((error) => {
                    console.log("NOT WORK")
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Login failed:', errorCode, errorMessage);
                });
        } else {
            // TODO: make changes to the UI for these console logs 
            console.log("Email or password cannot be empty")
        }


    }


    return (
        <div>
            <h1>Login</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email"
                    id="email"
                    className="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    className="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button onClick={handlelogin}>Login</button>
        </div >
    )
}

