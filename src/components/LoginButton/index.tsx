import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import icons from '../../images/icons.svg';
import { Actions } from './Actions';
import classes from './index.module.scss';

interface Props {
  className?: string;
}

const LoginButton = ({ className }: Props) => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <button className={`nav__btn ${classes['nav__btn--user']}`}>
          <svg className="nav__icon">
            <use href={`${icons}#icon-user`}></use>
          </svg>
          <span>{user?.nickname}</span>
        </button>
      ) : (
        <button className={className} onClick={() => loginWithRedirect()}>
          <svg className="nav__icon">
            <use href={`${icons}#icon-user`}></use>
          </svg>
          <span>Log In</span>
        </button>
      )}
      <Actions classes={classes} />
    </>
  );
};

export default LoginButton;
