import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './index.module.scss';

const Paginate = (props: any) => {
  return (
    <ReactPaginate
      containerClassName={classes.container}
      pageClassName={classes.page}
      previousClassName={classes.previous}
      nextClassName={classes.next}
      activeClassName={classes.active}
      {...props}
    />
  );
};

export default Paginate;
