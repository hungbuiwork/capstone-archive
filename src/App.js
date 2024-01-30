
import './App.css';
import { ProjectView } from './pages/ProjectView';
import { Upload } from './pages/Upload';
import Home from './pages/home';
import { Login } from './pages/login';

function App() {
  return (
    <div className="App">
      <Login></Login>
      <Home></Home>
      <hr></hr>
      <ProjectView></ProjectView>
      <hr></hr>
      <Upload></Upload>
    </div>
  );
}

export default App;
