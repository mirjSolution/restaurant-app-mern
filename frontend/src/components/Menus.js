import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Menus = ({ menus }) => {
  return (
    <Card className='my-3 rounded overflow-hidden'>
      <Link to={`/menus/${menus._id}`}>
        <Card.Img src={menus.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/menus/${menus._id}`}>
          <Card.Title as='div'>
            <strong>{menus.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={menus.rating} text={`${menus.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>${menus.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Menus;
