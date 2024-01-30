
import './App.css';
import AuthUser from './components/AuthUser';
import { ProjectView } from './pages/ProjectView';
import { Upload } from './pages/Upload';
import Home from './pages/home';
import { Login } from './pages/login';

function App() {
  return (
    <div className="App">
      <Login></Login>
      <AuthUser />
      <Home></Home>
      <hr></hr>
      <ProjectView></ProjectView>
      <hr></hr>
      <Upload></Upload>
    </div>
  );
}

export default App;
