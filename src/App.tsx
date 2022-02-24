import React from 'react';
import Header from './components/Header';
import Recipe from './components/Recipe';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <>
      <Header />
      <SearchResults />
      <Recipe />
    </>
  );
}

export default App;
