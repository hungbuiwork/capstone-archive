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
    path: "/submit",
    element:  <Upload></Upload>
  },
  {
    path: "/test",
    element:  <Home></Home>
  },
  {
    path: "/fullProjectView",
    element: <ProjectFull></ProjectFull>
  }
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
