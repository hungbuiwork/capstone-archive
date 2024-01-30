import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



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
                const userCheck = auth.currentUser.email;
                const user = userCredential.user;
                // New page direct 
                console.log(userCheck);
                console.log(user);

                if (userCheck.endsWith('@admin.com')) {
                    navigate('/verify');
                } else {
                    navigate('/submit');
                }
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

