import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useAddBookmarkMutation,
  useBookmarkedRecipesQuery,
  useDeleteBookmarkMutation,
} from '../generated/graphql';
import { formatRecipe } from '../utils/recipe';
import { AuthContext } from './AuthContext';
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
  const { currentUser } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState<RecipeListItem[]>([]);
  const { data: bookmardsData, refetch } = useBookmarkedRecipesQuery({
    variables: { searchQuery: { _eq: currentUser?.id } },
  });
  const [bookmarkMutaion] = useAddBookmarkMutation();
  const [unBookmarkMutaion] = useDeleteBookmarkMutation();

  const fetchBookmarks = useCallback(async () => {
    try {
      if (!bookmardsData) return;

      setBookmarks(bookmardsData!.recipes.map((d) => formatRecipe(d)));
    } catch (e) {
      console.log(e);
    }
  }, [bookmardsData]);

  const addBookmark = async (item: RecipeListItem) => {
    await bookmarkMutaion({ variables: { recipeId: item.id } });
    await refetch();
  };

  const removeBookmark = async (itemId: string) => {
    await unBookmarkMutaion({ variables: { recipeId: itemId } });
    await refetch();
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
