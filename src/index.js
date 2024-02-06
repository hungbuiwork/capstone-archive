import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { ProjectView } from './pages/ProjectView';
import { Upload } from './pages/Upload';
import { ProjectFull } from './components/ProjectFull';
import { Head } from './sections/Head';
import { VerifyProjects } from './pages/VerifyProjects';
import { ThankYou } from './pages/ThankYou';
import { Login } from './pages/login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Admin } from './pages/admin';

const IndexWithRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth(); // gets firebase auth from index, NOTE use auth = getAuth() for any firebase auth interacitons


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setIsAuthenticated(true);
      } else {
        // User is signed out.
        setIsAuthenticated(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const router = createHashRouter([
    {
      path: "/",
      element: <div><Head></Head><ProjectView></ProjectView></div>
    },
    {
      path: "/view/:projectID",
      element: <div><Head></Head><ProjectFull></ProjectFull></div>
    },
    {
      path: "/submit",
      element: isAuthenticated ? <div><Head></Head><Upload></Upload></div> : <Navigate to="/" />
    },
    {
      path: "/verify",
      element: isAuthenticated ? <div><Head></Head><VerifyProjects></VerifyProjects></div> : <Navigate to="/" />
    },
    {
      path: "/admin",
      element: isAuthenticated ? <div><Head></Head><Admin></Admin></div> : <Navigate to="/" />
    },
    {
      path: "/thankYou",
      element: <ThankYou></ThankYou>
    },
    {
      path: "/login/:type",
      element: <Login></Login>,
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IndexWithRouter />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
