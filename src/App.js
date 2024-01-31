import './App.css';
import { ProjectView } from './pages/ProjectView';
import { Upload } from './pages/Upload';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Home></Home>
      <hr></hr>
      <ProjectView></ProjectView>
      <hr></hr>
      <Upload></Upload>
    </div>
  );
}

export default App;
