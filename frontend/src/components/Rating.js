import React from 'react';
// import PropTypes from 'prop-types';

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';

const Rating = ({ value, text, color }) => {
  return (
    <IconContext.Provider value={{ color }}>
      <div className='rating'>
        <span>
          {value >= 1 ? (
            <BsStarFill />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <BsStarFill />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <BsStarFill />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <BsStarFill />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <BsStarFill />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <br />
        <span>{text && text}</span>
      </div>
    </IconContext.Provider>
  );
};

Rating.defaultProps = {
  color: '#F0E68C',
};

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string,
// };

export default Rating;
