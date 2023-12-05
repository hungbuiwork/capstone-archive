import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProjectView } from './pages/ProjectView';
import { Upload } from './pages/Upload';
import { Welcome } from './pages/Welcome';
import Home from './pages/home';
import { ProjectFull } from './components/ProjectFull';
import { Head } from './sections/Head';
import { VerifyProjects } from './pages/VerifyProjects';
import { ThankYou } from './pages/ThankYou';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Welcome></Welcome>
  },
  {
    path: "/view",
    element:  <div><Head></Head><ProjectView></ProjectView></div>
  },
  {
    path: "/view/:projectID",
    element: <div><Head></Head><ProjectFull></ProjectFull></div>
  },
  {
    path: "/submit",
    element:  <div><Head></Head><Upload></Upload></div>
  },
  {
    path: "/verify",
    element: <div><Head></Head><VerifyProjects></VerifyProjects></div>
  },
  {
    path: "/thankYou",
    element: <ThankYou></ThankYou>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
