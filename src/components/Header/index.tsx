import React from 'react';
import logo from '../../images/logo.png';
import Bookmarks from '../Bookmarks';
import Search from '../Search';
import icons from '../../images/icons.svg';
import LoginButton from '../LoginButton';

function Header({
  openNewRecipeHandler,
}: {
  openNewRecipeHandler: () => void;
}) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <Search />

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className="nav__btn nav__btn--add-recipe"
              onClick={openNewRecipeHandler}
            >
              <svg className="nav__icon">
                <use href={`${icons}#icon-edit`}></use>
              </svg>
              <span>Add recipe</span>
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use href={`${icons}#icon-bookmark`}></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <Bookmarks />
          </li>
          <li className="nav__item">
            <LoginButton className="nav__btn" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
