import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import Home from './components/home/Home'
import DetailRecipe from './components/detail/DetailRecipe';
import CreateRecipe from './components/create/CreateRecipe';

function App() {
  return (
    <div className="App">
      <>
        <Route exact path='/' render={() => <LandingPage/>} />
        <Route path='/home' render={()=> <Home />} />
        <Route path='/recipes/:id' render={() => <DetailRecipe/>} />
        <Route path='/create' render={()=> <CreateRecipe/>} />
      </>
    </div>
  );
};

export default App;
