import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BookmarkContext } from '../../context/BookmarkContext';

const Bookmarks = () => {
  const bookmarkCtx = useContext(BookmarkContext);

  return (
    <div className="bookmarks">
      <ul className="bookmarks__list">
        {bookmarkCtx.bookmarks.length === 0 && (
          <div className="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
          </div>
        )}

        {bookmarkCtx.bookmarks.map((bookmarkedRecipe) => (
          <li className="preview" key={`bookmark:${bookmarkedRecipe.id}`}>
            <NavLink
              className={({ isActive }) =>
                `preview__link ${isActive ? 'preview__link--active' : ''}`
              }
              to={`/recipes/${bookmarkedRecipe.id}`}
            >
              <figure className="preview__fig">
                <img
                  src={bookmarkedRecipe.image}
                  alt={bookmarkedRecipe.title}
                />
              </figure>
              <div className="preview__data">
                <h4 className="preview__title">{bookmarkedRecipe.title}</h4>
                <p className="preview__publisher">
                  {bookmarkedRecipe.publisher}
                </p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
