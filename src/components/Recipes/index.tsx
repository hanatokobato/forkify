import React from 'react';
import Recipe from '../Recipe';
import SearchResults from '../SearchResults';

const Recipes = () => {
  return (
    <div className="recipes">
      <SearchResults />
      <Recipe />
    </div>
  );
};

export default Recipes;
