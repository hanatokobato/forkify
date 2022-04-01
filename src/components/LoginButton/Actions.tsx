import React from 'react';
import LogoutButton from '../LogoutButton';

export const Actions = ({ classes }: any) => {
  return (
    <div className={classes.actions}>
      <ul className={classes.actions__list}>
        <li className={classes.actions__item}>
          <LogoutButton className={classes.btn__logout} />
        </li>
      </ul>
    </div>
  );
};
