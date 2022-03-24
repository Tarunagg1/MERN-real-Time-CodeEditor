import { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editorpage from './pages/Editorpage';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Fragment>
      <Toaster position="top-right" toastOptions={{
        success: {
          theme: {
            primary: '#4aed88'
          }
        }
      }} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<Editorpage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
