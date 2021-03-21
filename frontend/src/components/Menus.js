import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Menus = ({ menus }) => {
  return (
    <Card className='my-3 rounded overflow-hidden'>
      <a href={`/menus/${menus._id}`}>
        <Card.Img src={menus.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/munus/${menus._id}`}>
          <Card.Title as='div'>
            <strong>{menus.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <Rating value={menus.rating} text={`${menus.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>${menus.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Menus;
