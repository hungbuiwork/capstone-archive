import logo from './logo.svg';
import './App.css';
import { Content } from './sections/Content';
import { Head } from './sections/Head';
import { Foot } from './sections/Foot';

function App() {
  return (
    <div className="App">
      <Head></Head>
      <Content></Content>
      <Foot></Foot>
    </div>
  );
}

export default App;
