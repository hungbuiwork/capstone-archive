import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const Login = () => {

    const params = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    if (params.type !== 'student' && params.type !== 'verify' && params.type !== 'admin') {
        navigate('/')
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlelogin = () => {
        // TODO FIXXXXXXX

        let validUserDomains = ["admin.com"]
        let navigatePage = "/"
        if (params.type === "student") {
            validUserDomains.push("student.com");
            navigatePage = '/studentpage'
        } else if (params.type === "verify") {
            validUserDomains.push("verifier.com");
            navigatePage = '/verifierpage'
        } else if (params.type === "admin") {
            navigatePage = '/adminpage'
        }



        if (email && password) {

            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in 
                const userCheck = auth.currentUser.email;
                const user = userCredential.user;
                // New page direct based on what page
                const isValidUser = validUserDomains.some(domain => userCheck.endsWith(domain));

                if (isValidUser) {
                    console.log(navigatePage)
                    navigate(navigatePage);
                } else {
                    // TODO 
                    console.log("Invalid credentials ")
                    console.log("Popup for incorrect credentials/something")
                }
            })
                .catch((error) => {
                    console.log("NOT WORK")
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(`Login failed: ${errorCode} ${errorMessage}`);
                });
        } else {
            // TODO: make changes to the UI for these console logs 
            console.log("Email or password cannot be empty")
        }


    }


    return (
        <body>
            <div className="LoginForm">
                <h1>{params.type} Login</h1>
                <div id="login-email">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        className="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div id="login-password">
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
        </body>

    )
}

