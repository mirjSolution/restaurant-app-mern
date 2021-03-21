import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMenuDetails } from '../actions/menuActions';

const MenuScreen = ({ history, match }) => {
  const [order, setOrder] = useState(0);

  const dispatch = useDispatch();

  const menuDetails = useSelector((state) => state.menuDetails);
  const { loading, error, menu } = menuDetails;

  useEffect(() => {
    dispatch(listMenuDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?order=${order}`);
  };

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
              <ListGroup.Item>Description: {menu.description}</ListGroup.Item>
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

              {menu.orderCount > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Order Quantity</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                      >
                        {[...Array(menu.orderCount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default MenuScreen;
