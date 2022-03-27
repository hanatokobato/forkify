import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_KEY } from '../../consts';
import SearchContext, { RecipeListItem } from '../../context/SearchContext';
import icons from '../../images/icons.svg';
import Paginate from '../Paginate';

const PER_PAGE = 10;

const getSearchResultsPage = (results: RecipeListItem[], page: number) => {
  const start = (page - 1) * PER_PAGE;
  const end = page * PER_PAGE - 1;
  return results.slice(start, end);
};

const getPageCount = (results: RecipeListItem[]) => {
  return Math.ceil(results.length / PER_PAGE);
};

function SearchResults() {
  const { recipeList: _recipeList, isLoading, error } = useContext(
    SearchContext
  );
  const [page, setPage] = useState<number>(1);
  const recipeList = getSearchResultsPage(_recipeList, page);

  const handlePageClick = (e: any) => {
    setPage(e.selected + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [_recipeList]);

  return (
    <div className="search-results">
      {!isLoading && error && (
        <div className="error">
          <div>
            <svg>
              <use xlinkHref={`${icons}#icon-alert-triangle`}></use>
            </svg>
          </div>
          <p>{error || 'No recipes found!'}</p>
        </div>
      )}

      {isLoading && (
        <div className="spinner">
          <svg>
            <use xlinkHref={`${icons}#icon-loader`}></use>
          </svg>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <ul className="results">
            {recipeList.map((preview) => (
              <li className="preview" key={`preview:${preview.id}`}>
                <NavLink
                  to={`/recipes/${preview.id}`}
                  className={({ isActive }) =>
                    `preview__link ${isActive ? 'preview__link--active' : ''}`
                  }
                >
                  <figure className="preview__fig">
                    <img src={preview.image} alt={preview.title} />
                  </figure>
                  <div className="preview__data">
                    <h4 className="preview__title">{preview.title}</h4>
                    <p className="preview__publisher">{preview.publisher}</p>
                    <div
                      className={`preview__user-generated ${
                        preview.key === API_KEY ? '' : 'hidden'
                      }`}
                    >
                      <svg>
                        <use href={`${icons}#icon-user`}></use>
                      </svg>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {_recipeList.length > 0 && (
              <Paginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={getPageCount(_recipeList)}
                previousLabel="< previous"
                renderOnZeroPageCount={undefined}
              />
            )}
          </div>
        </>
      )}

      <p className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
          rel="noreferrer"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
}

export default SearchResults;
