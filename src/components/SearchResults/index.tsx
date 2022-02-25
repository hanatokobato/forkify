import React, { useContext, useState } from 'react';
import SearchContext, { RecipeListItem } from '../../context/SearchContext';
import icons from '../../images/icons.svg';

const PER_PAGE = 10;

const getSearchResultsPage = (results: RecipeListItem[], page: number) => {
  const start = (page - 1) * PER_PAGE;
  const end = page * PER_PAGE - 1;
  return results.slice(start, end);
};

function SearchResults() {
  const { recipeList: _recipeList, isLoading, error } = useContext(
    SearchContext
  );
  const [page, setPage] = useState<number>(1);
  const maxPage =
    _recipeList.length % PER_PAGE === 0
      ? Math.floor(_recipeList.length / PER_PAGE)
      : Math.floor(_recipeList.length / PER_PAGE) + 1;
  const recipeList = getSearchResultsPage(_recipeList, page);

  const nextPageHandler = (_e: any) => {
    setPage((oldPage) => (oldPage < maxPage ? oldPage + 1 : maxPage));
  };

  const prevPageHandler = (_e: any) => {
    setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : oldPage));
  };

  return (
    <div className="search-results">
      {!isLoading && (error || recipeList.length === 0) && (
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
                <a
                  className="preview__link preview__link--active"
                  href={`#${preview.id}`}
                >
                  <figure className="preview__fig">
                    <img src={preview.image} alt={preview.title} />
                  </figure>
                  <div className="preview__data">
                    <h4 className="preview__title">{preview.title}</h4>
                    <p className="preview__publisher">{preview.publisher}</p>
                    <div className="preview__user-generated">
                      <svg>
                        <use href={`${icons}#icon-user`}></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {page > 1 && (
              <button
                className="btn--inline pagination__btn--prev"
                onClick={prevPageHandler}
              >
                <svg className="search__icon">
                  <use href={`${icons}#icon-arrow-left`}></use>
                </svg>
                <span>{`Page ${page - 1}`}</span>
              </button>
            )}
            {page < maxPage && (
              <button
                className="btn--inline pagination__btn--next"
                onClick={nextPageHandler}
              >
                <span>{`Page ${page + 1}`}</span>
                <svg className="search__icon">
                  <use href={`${icons}#icon-arrow-right`}></use>
                </svg>
              </button>
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
