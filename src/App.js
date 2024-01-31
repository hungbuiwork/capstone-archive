import './App.css';
// import AuthUser from './components/AuthUser';
import { ProjectView } from './pages/ProjectView';
import { Upload } from './pages/Upload';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      {/* <AuthUser /> */}
      <Home></Home>
      <hr></hr>
      <ProjectView></ProjectView>
      <hr></hr>
      <Upload></Upload>
    </div>
  );
}

export default App;
