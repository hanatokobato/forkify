import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useAddBookmarkMutation, useBookmarkedRecipesLazyQuery, useDeleteBookmarkMutation } from '../generated/graphql';
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

export const BookmarkContextProvider = ({ children }: Props) => {
  const { token, id } = getCachedUser();
  const [bookmarks, setBookmarks] = useState<RecipeListItem[]>([]);
  const [getBookmarks] = useBookmarkedRecipesLazyQuery();
  const [bookmarkMutaion] = useAddBookmarkMutation();
  const [unBookmarkMutaion] = useDeleteBookmarkMutation();

  const fetchBookmarks = useCallback(async () => {
    try {
      if (!token) return;

      const { data } = await getBookmarks({
        variables: { searchQuery: { _eq: id } },
      });
      setBookmarks(data!.recipes.map((d) => formatRecipe(d)));
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
