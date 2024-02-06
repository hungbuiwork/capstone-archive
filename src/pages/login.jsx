import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export const Login = () => {

    const params = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    if (params.type !== 'submit' && params.type !== 'verify' && params.type !== 'admin') {
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
        if (params.type === "submit") {
            validUserDomains.push("student.com");
            navigatePage = '/submit'
        } else if (params.type === "verify") {
            validUserDomains.push("verifier.com");
            navigatePage = '/verify'
        } else if (params.type === "admin") {
            navigatePage = '/admin'
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

        <div>
            <h1>{params.type}Login</h1>
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

