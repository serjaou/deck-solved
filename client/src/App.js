import React from 'react';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className='content'>Hello World</div>
      <Footer />
    </div>
  );
}

export default App;
