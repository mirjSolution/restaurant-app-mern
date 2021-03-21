import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import menus from '../menus';

const MenuScreen = ({ match }) => {
  const menu = menus.find((menu) => menu._id === match.params.id);

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={menu.image} alt={menu.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{menu.name}</h3>
              <Rating value={menu.rating} text={`${menu.numReviews}`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${menu.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${menu.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>
                  Price: <strong>${menu.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  Status:{' '}
                  <strong>
                    {menu.orderCount > 0 ? 'Available' : 'Not Available'}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                className='btn-block'
                type='button'
                disabled={menu.orderCount === 0}
              >
                Order Now
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default MenuScreen;
