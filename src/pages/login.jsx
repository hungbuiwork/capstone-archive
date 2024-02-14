import React, { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import './login-styles.css'; 


export const Login = () => {

    // const params = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const { dispatch } = useContext(AuthContext)

    const handlelogin = (e) => {
        e.preventDefault();

        if (email && password) {

            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in 
                let navigatePage = "/"
                let permissionLevel = -1;
                const userCheck = auth.currentUser.email;
                const user = userCredential.user;
                // checking the user permissions based on domain end
                if (userCheck.endsWith("student.com")) {
                    navigatePage = "/studentpage"
                    permissionLevel = 0
                } else if (userCheck.endsWith("verifier.com")) {
                    navigatePage = "/verifierpage"
                    permissionLevel = 1
                } else if (userCheck.endsWith("admin.com")) {
                    navigatePage = "/adminpage"
                    permissionLevel = 2
                }

                // Set context for app
                // dispatch({ type: "MAINLOGIN", payload: user })

                dispatch({ type: "MAINLOGIN", payload: user })

                dispatch({ type: "PERMISSION_LEVEL", payload: user })

                // Navigate to different page depending on the user. 
                navigate(navigatePage)

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

        <div className="LoginForm">
            <h1 id="LoginTitle">Login with UCI Email</h1>
            <div>
                <input type="email"
                    id="login-email"
                    placeholder="UCI Email:"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <input type="password"
                    id="login-password"
                    placeholder="Password"
                    className="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button id="LoginButton" onClick={handlelogin}>SIGN IN</button>
        </div >


    )
}

