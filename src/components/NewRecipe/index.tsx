import React, { FormEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { API_KEY, API_URL } from '../../consts';
import useHttp from '../../hooks/useHttp';
import icons from '../../images/icons.svg';
import { useNavigate } from 'react-router-dom';

interface NewRecipe {
  title?: string;
  sourceUrl?: string;
  image?: string;
  publisher?: string;
  cookingTime?: number;
  servings?: number;
  ingredients?: { [key: string]: string };
}

const Backdrop = ({ closeHandler }: { closeHandler: () => void }) => {
  return <div className="overlay" onClick={closeHandler}></div>;
};

const ModalOverlay = ({ closeHandler }: { closeHandler: () => void }) => {
  const [newRecipe, setNewRecipe] = useState<NewRecipe>({});
  const { isLoading, error: apiError, sendRequest } = useHttp();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  const formDataChangeHandler = (e: any) => {
    setNewRecipe((currentData) => {
      let newIngredients = { ...currentData.ingredients };

      if (e.target.name.startsWith('ingredient')) {
        newIngredients[e.target.name] = e.target.value;
      }

      const newData = {
        ...currentData,
        [e.target.name.startsWith('ingredient')
          ? 'ingredients'
          : e.target.name]: e.target.name.startsWith('ingredient')
          ? newIngredients
          : e.target.value,
      };
      return newData;
    });
  };

  const submitFormHandler: FormEventHandler = (e) => {
    try {
      e.preventDefault();

      const ingredients = Object.entries(newRecipe.ingredients || {}).map(
        (ing) => {
          const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3) throw new Error('Invalid ingredient!');

          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        }
      );

      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe!.cookingTime!,
        servings: +newRecipe!.servings!,
        ingredients: ingredients,
      };

      sendRequest(
        {
          url: `${API_URL}?key=${API_KEY}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: recipe,
        },
        (data) => {
          closeHandler();
          navigate(`/recipes/${data.data.recipe.id}`);
        }
      );
    } catch (e: any) {
      setError(e.message || 'Something went wrong!');
    }
  };

  const closeModalHandler = () => {
    closeHandler();
  };

  return (
    <div className="add-recipe-window">
      <button className="btn--close-modal" onClick={closeModalHandler}>
        &times;
      </button>

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

      {!isLoading && !error && (
        <form className="upload" onSubmit={submitFormHandler}>
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label>Title</label>
            <input
              value={newRecipe.title || ''}
              required
              name="title"
              type="text"
              onChange={formDataChangeHandler}
            />
            <label>URL</label>
            <input
              value={newRecipe.sourceUrl || ''}
              required
              name="sourceUrl"
              type="text"
              onChange={formDataChangeHandler}
            />
            <label>Image URL</label>
            <input
              value={newRecipe.image || ''}
              required
              name="image"
              type="text"
              onChange={formDataChangeHandler}
            />
            <label>Publisher</label>
            <input
              value={newRecipe.publisher || ''}
              required
              name="publisher"
              type="text"
              onChange={formDataChangeHandler}
            />
            <label>Prep time</label>
            <input
              value={newRecipe.cookingTime || ''}
              required
              name="cookingTime"
              type="number"
              onChange={formDataChangeHandler}
            />
            <label>Servings</label>
            <input
              value={newRecipe.servings || ''}
              required
              name="servings"
              type="number"
              onChange={formDataChangeHandler}
            />
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              value={newRecipe?.ingredients?.['ingredient-1'] || ''}
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={formDataChangeHandler}
            />
            <label>Ingredient 2</label>
            <input
              value={newRecipe?.ingredients?.['ingredient-2'] || ''}
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={formDataChangeHandler}
            />
            <label>Ingredient 3</label>
            <input
              value={newRecipe?.ingredients?.['ingredient-3'] || ''}
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={formDataChangeHandler}
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              value={newRecipe?.ingredients?.['ingredient-4'] || ''}
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={formDataChangeHandler}
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              value={newRecipe?.ingredients?.['ingredient-5'] || ''}
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={formDataChangeHandler}
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              value={newRecipe?.ingredients?.['ingredient-6'] || ''}
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={formDataChangeHandler}
            />
          </div>

          <button className="btn upload__btn">
            <svg>
              <use href={`${icons}#icon-upload-cloud`}></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      )}
    </div>
  );
};

interface NewPrecipeProps {
  isOpen: boolean;
  closeHandler: () => void;
}

const NewRecipe = ({ isOpen, closeHandler }: NewPrecipeProps) => {
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <Backdrop closeHandler={closeHandler} />,
          document.getElementById('backdrop-root') as HTMLElement
        )}
      {isOpen &&
        ReactDOM.createPortal(
          <ModalOverlay closeHandler={closeHandler} />,
          document.getElementById('modal-root') as HTMLElement
        )}
    </>
  );
};

export default NewRecipe;
