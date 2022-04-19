import { gql, useLazyQuery, useMutation } from '@apollo/client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { getCachedUser } from '../utils/auth';
import { formatRecipe } from '../utils/recipe';
import { RecipeListItem } from './SearchContext';

interface BookmarkContext {
  bookmarks: RecipeListItem[];
  addBookmark: (item: RecipeListItem) => void;
  removeBookmark: (itemId: string) => void;
}

export const BookmarkContext = React.createContext<BookmarkContext>({
  addBookmark: () => {},
  bookmarks: [],
  removeBookmark: () => {},
});

interface Props {
  children: ReactNode;
}

const BOOKMARK_QUERY = gql`
  query getRecipes($searchQuery: bigint_comparison_exp!) {
    recipes(where: { recipe_bookmarks: { user_id: $searchQuery } }) {
      id
      title
      publisher
      image_url
    }
  }
`;

const ADD_BOOKMARK_MUTATION = gql`
  mutation addBookmark($recipeId: bigint!) {
    insert_recipe_bookmarks_one(object: { recipe_id: $recipeId }) {
      id
    }
  }
`;

const REMOVE_BOOKMARK_MUTATION = gql`
  mutation MyMutation($recipeId: bigint!) {
    delete_recipe_bookmarks(where: { recipe_id: { _eq: $recipeId } }) {
      returning {
        id
      }
    }
  }
`;

export const BookmarkContextProvider = ({ children }: Props) => {
  const { token, id } = getCachedUser();
  const [bookmarks, setBookmarks] = useState<RecipeListItem[]>([]);
  const [getBookmarks] = useLazyQuery(BOOKMARK_QUERY);
  const [bookmarkMutaion] = useMutation(ADD_BOOKMARK_MUTATION);
  const [unBookmarkMutaion] = useMutation(REMOVE_BOOKMARK_MUTATION);

  const fetchBookmarks = useCallback(async () => {
    try {
      if (!token) return;

      const { data } = await getBookmarks({
        variables: { searchQuery: { _eq: id } },
      });
      setBookmarks(data.recipes.map((d: any) => formatRecipe(d)));
    } catch (e) {}
  }, [token, getBookmarks, id]);

  const addBookmark = async (item: RecipeListItem) => {
    await bookmarkMutaion({ variables: { recipeId: item.id } });
    await fetchBookmarks();
  };

  const removeBookmark = async (itemId: string) => {
    await unBookmarkMutaion({ variables: { recipeId: itemId } });
    await fetchBookmarks();
  };

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
