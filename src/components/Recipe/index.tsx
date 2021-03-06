import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import icons from '../../images/icons.svg';
import { BookmarkContext } from '../../context/BookmarkContext';
import { useRecipeLazyQuery } from '../../generated/graphql';
import { AuthContext } from '../../context/AuthContext';

export interface RecipeData {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: string;
  ingredients: { quantity: number | null; description: string; unit: string }[];
  isBookmarked?: boolean;
  userId: number;
}

function Recipe() {
  const [recipe, setRecipe] = useState<RecipeData>();
  const [fetchRecipe, { loading: isLoading, error }] = useRecipeLazyQuery();
  const bookmarkCtx = useContext(BookmarkContext);
  const params = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setRecipe(
      (currentRecipe) =>
        currentRecipe && {
          ...currentRecipe,
          isBookmarked: bookmarkCtx.bookmarks.some(
            (item) => item.id === currentRecipe.id
          ),
        }
    );
  }, [bookmarkCtx.bookmarks]);

  useEffect(() => {
    if (!params.id) return;

    const formatRecipe = (data: any) => {
      const { recipes_by_pk: fetchedRecipe } = data.data;
      const fomattedRecipe: RecipeData = {
        id: fetchedRecipe.id,
        title: fetchedRecipe.title,
        publisher: fetchedRecipe.publisher,
        sourceUrl: fetchedRecipe.source_url,
        image: fetchedRecipe.image_url,
        servings: fetchedRecipe.servings,
        cookingTime: fetchedRecipe.cooking_time,
        ingredients: fetchedRecipe.ingredients,
        isBookmarked: bookmarkCtx.bookmarks.some(
          (item) => item.id === fetchedRecipe.id
        ),
        userId: fetchedRecipe.user_id,
      };
      setRecipe(fomattedRecipe);
    };

    fetchRecipe({ variables: { id: params.id } }).then(formatRecipe);
  }, [fetchRecipe, params.id, bookmarkCtx.bookmarks]);

  const updateServingsHandler = (newValue: number) => {
    newValue > 0 &&
      setRecipe(
        (lastestRecipe) =>
          lastestRecipe && {
            ...lastestRecipe,
            servings: newValue,
            ingredients: lastestRecipe.ingredients.map((ingredient) => ({
              ...ingredient,
              quantity: ingredient.quantity
                ? (ingredient.quantity * newValue) / lastestRecipe.servings
                : null,
            })),
          }
      );
  };

  const bookmarkHandler = () => {
    if (!recipe!.isBookmarked) {
      const bookmarkAttr = (({
        id,
        title,
        publisher,
        image,
        userId,
      }: RecipeData) => ({
        id,
        title,
        publisher,
        image,
        userId,
      }))(recipe!);
      bookmarkCtx.addBookmark(bookmarkAttr);
      setRecipe(
        (oldRecipe) => oldRecipe && { ...oldRecipe, isBookmarked: true }
      );
    } else {
      bookmarkCtx.removeBookmark(recipe!.id);
      setRecipe(
        (oldRecipe) => oldRecipe && { ...oldRecipe, isBookmarked: false }
      );
    }
  };

  return (
    <div className="recipe">
      {!isLoading && !error && !recipe && (
        <div className="message">
          <div>
            <svg>
              <use xlinkHref={`${icons}#icon-smile`}></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      )}

      {isLoading && (
        <div className="spinner">
          <svg>
            <use xlinkHref={`${icons}#icon-loader`}></use>
          </svg>
        </div>
      )}

      {!isLoading && error && (
        <div className="error">
          <div>
            <svg>
              <use xlinkHref={`${icons}#icon-alert-triangle`}></use>
            </svg>
          </div>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && recipe && (
        <>
          <figure className="recipe__fig">
            <img
              src={recipe?.image}
              alt={recipe.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{recipe.title}</span>
            </h1>
          </figure>
          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use xlinkHref={`${icons}#icon-clock`}></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {recipe.cookingTime}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use xlinkHref={`${icons}#icon-users`}></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {recipe.servings}
              </span>
              <span className="recipe__info-text">servings</span>
              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--increase-servings"
                  onClick={() => updateServingsHandler(recipe.servings - 1)}
                >
                  <svg>
                    <use xlinkHref={`${icons}#icon-minus-circle`}></use>
                  </svg>
                </button>
                <button
                  className="btn--tiny btn--increase-servings"
                  onClick={() => updateServingsHandler(recipe.servings + 1)}
                >
                  <svg>
                    <use xlinkHref={`${icons}#icon-plus-circle`}></use>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`recipe__user-generated ${
                recipe.userId ? '' : 'hidden'
              }`}
            >
              <svg>
                <use xlinkHref={`${icons}#icon-user`}></use>
              </svg>
            </div>
            {currentUser && (
              <button className="btn--round" onClick={bookmarkHandler}>
                <svg className="">
                  <use
                    xlinkHref={`${icons}#icon-bookmark${
                      recipe.isBookmarked ? '-fill' : ''
                    }`}
                  ></use>
                </svg>
              </button>
            )}
          </div>
          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li className="recipe__ingredient" key={`ingredient:${index}`}>
                  <svg className="recipe__icon">
                    <use xlinkHref={`${icons}#icon-check`}></use>
                  </svg>
                  <div className="recipe__quantity">{ingredient.quantity}</div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{`${ingredient.unit} `}</span>
                    {ingredient.description}
                  </div>
                </li>
              ))}
            </ul>
            <p className="recipe__directions-text"></p>
            <Link className="btn--small recipe__btn" to="/products">
              <span>Shop Now</span>
            </Link>
          </div>
          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher">{recipe.publisher}</span>.
              Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={recipe.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use xlinkHref={`${icons}#icon-arrow-right`}></use>
              </svg>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
