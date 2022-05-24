import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import icons from '../../images/icons.svg';
import { To } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { ApolloError } from '@apollo/client';
import classes from './index.module.scss';
import { useAddRecipeMutation } from '../../generated/graphql';

const Backdrop = ({ closeHandler }: { closeHandler: (path: To) => void }) => {
  const clickHandler = () => {
    closeHandler(-1 as To);
  };

  return <div className="overlay" onClick={clickHandler}></div>;
};

const ModalOverlay = ({
  closeHandler,
}: {
  closeHandler: (path: To) => void;
}) => {
  const [error, setError] = useState<ApolloError>();
  const required = (value: any) => (value ? undefined : 'Required');
  const [addRecipe, { loading: isLoading, error: mutationError }] = useAddRecipeMutation(
  );

  useEffect(() => {
    setError(mutationError);
  }, [mutationError]);

  const submitFormHandler = async (values: any) => {
    try {
      const recipe = {
        title: values.title,
        source_url: values.sourceUrl,
        image_url: values.image,
        publisher: values.publisher,
        cooking_time: values.cookingTime,
        servings: values.servings,
        ingredients: {
          data: values.ingredients,
        },
      };

      const { data } = await addRecipe({ variables: { recipe: recipe } });

      closeHandler(`/recipes/${data?.insert_recipes_one?.id}`);
    } catch (e: any) {
      setError(e.message || 'Something went wrong!');
    }
  };

  const closeModalHandler = () => {
    closeHandler(-1 as To);
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
          <p>{error.message}</p>
        </div>
      )}

      {!isLoading && !error && (
        <Form
          onSubmit={submitFormHandler}
          mutators={{ ...arrayMutators }}
          initialValues={{ ingredients: [{}] }}
          render={({
            handleSubmit,
            form: {
              mutators: { push },
            },
          }) => (
            <form className="upload" onSubmit={handleSubmit}>
              <div className="upload__column">
                <h3 className="upload__heading">Recipe data</h3>
                <Field name="title" validate={required}>
                  {({ input, meta }) => (
                    <div className="upload__row">
                      <label>Title</label>
                      <input {...input} type="text" placeholder="Title" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="sourceUrl" validate={required}>
                  {({ input, meta }) => (
                    <div className="upload__row">
                      <label>URL</label>
                      <input {...input} type="text" placeholder="URL" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="image" validate={required}>
                  {({ input, meta }) => (
                    <div className="upload__row">
                      <label>Image URL</label>
                      <input {...input} type="text" placeholder="Image URL" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="publisher" validate={required}>
                  {({ input, meta }) => (
                    <div className="upload__row">
                      <label>Publisher</label>
                      <input {...input} type="text" placeholder="Publisher" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="cookingTime" validate={required}>
                  {({ input, meta }) => (
                    <div className="upload__row">
                      <label>Prep time</label>
                      <input {...input} type="text" placeholder="Prep time" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="servings" validate={required}>
                  {({ input, meta }) => (
                    <div className="upload__row">
                      <label>Servings</label>
                      <input {...input} type="text" placeholder="Servings" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className="upload__column">
                <h3 className="upload__heading">Ingredients</h3>
                <FieldArray name="ingredients">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <div className="upload__row" key={name}>
                        <label>Ingredient {index + 1}</label>

                        <div className="upload__row--ingredient">
                          <Field name={`${name}.quantity`} validate={required}>
                            {({ input, meta }) => (
                              <div className="upload__row--quantity">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder={`Quantity`}
                                />

                                {meta.error && meta.touched && (
                                  <span>{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>

                          <Field name={`${name}.unit`} validate={required}>
                            {({ input, meta }) => (
                              <div className="upload__row--unit">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder={`Unit`}
                                />
                                {meta.error && meta.touched && (
                                  <span>{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>

                          <Field
                            name={`${name}.description`}
                            validate={required}
                          >
                            {({ input, meta }) => (
                              <div className="upload__row--description">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder={`Description`}
                                />

                                {meta.error && meta.touched && (
                                  <span>{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>

                          <span
                            onClick={() => fields.remove(index)}
                            style={{ cursor: 'pointer' }}
                          >
                            ❌
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </FieldArray>
                <button
                  type="button"
                  onClick={() => push('ingredients', undefined)}
                  className={classes['btn--add-ingredient']}
                >
                  Add Ingredient &#x2B;
                </button>
              </div>

              <button className="btn upload__btn">
                <svg>
                  <use href={`${icons}#icon-upload-cloud`}></use>
                </svg>
                <span>Upload</span>
              </button>
            </form>
          )}
        ></Form>
      )}
    </div>
  );
};

interface NewPrecipeProps {
  isOpen: boolean;
  closeHandler: (path: To) => void;
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
