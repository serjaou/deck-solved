import React from 'react';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className='content'>
        <Search />
      </div>
      <Footer />
    </div>
  );
}

export default App;
