import './App.css';
import Navbar from './component/Navbar'
import Home from './component/Home'
import HomeTitle from './component/HomeTitle'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <HomeTitle />
      <Navbar />
      <Home />
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;