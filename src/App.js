import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UselessPage from './pages/UselessPage';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/useless_page" element={<UselessPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
