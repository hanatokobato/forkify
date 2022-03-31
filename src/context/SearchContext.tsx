import React, { ReactNode, useCallback, useState } from 'react';
import { RecipeData } from '../components/Recipe';
import { ApolloError, gql, useLazyQuery } from '@apollo/client';

export type RecipeListItem = Pick<
  RecipeData,
  'id' | 'title' | 'publisher' | 'image' | 'key'
>;

interface SearchContext {
  fetchRecipes: (query: string) => void;
  recipeList: RecipeListItem[];
  isLoading: boolean;
  error?: ApolloError;
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

const RECIPES_QUERY = gql`
  query getRecipes(
    $searchQuery: String_comparison_exp!
  ) {
    recipes(
      where: {title: $searchQuery}
    ) {
      id
      title
      publisher
      image_url
    }
  }
`;

export const SearchContextProvider = ({ children }: Props) => {
  const [recipeList, setRecipeList] = useState<RecipeListItem[]>([]);
  const [getRecipes, { loading: isLoading, error, data }] = useLazyQuery(RECIPES_QUERY);

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

      getRecipes({variables: {searchQuery: {_ilike: `%${query}%`}}}).then(formatResult);
    },
    [getRecipes]
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
