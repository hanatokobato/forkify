import React, { ReactNode, useEffect, useState } from 'react';
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
  const [bookmarks, setBookmarks] = useState<RecipeListItem[]>([]);

  const addBookmark = (item: RecipeListItem) => {
    setBookmarks((oldBookmarks) => {
      const newBookmarks = [...oldBookmarks, item];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const removeBookmark = (itemId: string) => {
    setBookmarks((oldBookmarks) => {
      const newBookmarks = oldBookmarks.filter((item) => item.id !== itemId);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  useEffect(() => {
    const persistedBookmarks = localStorage.getItem('bookmarks');
    persistedBookmarks && setBookmarks(JSON.parse(persistedBookmarks));
  }, []);

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
