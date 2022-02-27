import React, { ReactNode, useCallback, useState } from 'react';
import { RecipeData } from '../components/Recipe';
import { API_KEY, API_URL } from '../consts';
import useHttp from '../hooks/useHttp';

export type RecipeListItem = Pick<
  RecipeData,
  'id' | 'title' | 'publisher' | 'image' | 'key'
>;

interface SearchContext {
  fetchRecipes: (query: string) => void;
  recipeList: RecipeListItem[];
  isLoading: boolean;
  error?: string;
}

const SearchContext = React.createContext<SearchContext>({
  fetchRecipes: () => {},
  recipeList: [],
  isLoading: false,
  error: undefined,
});

interface Props {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: Props) => {
  const [recipeList, setRecipeList] = useState<RecipeListItem[]>([]);
  const { isLoading, error, sendRequest } = useHttp();

  const fetchRecipes = useCallback(
    (query) => {
      const formatResult = (data: any) => {
        const { recipes: fetchedRecipes } = data.data;
        const formattedRecipes = fetchedRecipes.map((recipe: any) => ({
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          image: recipe.image_url,
          key: recipe.key,
        }));
        setRecipeList(formattedRecipes);
      };

      sendRequest(
        { url: `${API_URL}?search=${query}&key=${API_KEY}` },
        formatResult
      );
    },
    [sendRequest]
  );

  return (
    <SearchContext.Provider
      value={{
        fetchRecipes: fetchRecipes,
        recipeList: recipeList,
        isLoading: isLoading,
        error: error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
