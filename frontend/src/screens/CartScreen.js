import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const menuParamsId = match.params.id;

  const order = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (menuParamsId) {
      dispatch(addToCart(menuParamsId, order));
    }
  }, [dispatch, menuParamsId, order]);

  const removeFromCartHandler = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <Row className='d-flex justify-content-center align-content-center'>
        <Col md={10}>
          <h1>Order Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Order Cart Is Empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.menuId}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/menus/${item.menuId}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.order}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.menuId, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.orderCount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeFromCartHandler(item.menuId)}
                        type='button'
                        variant='light'
                      >
                        <FaTrash color='red' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2 className='text-right'>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.order, 0)}) items
                  =
                  <span className='text-success'>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.order * item.price, 0)
                      .toFixed(2)}
                  </span>
                </h2>
              </ListGroup.Item>
            </ListGroup>
          )}

          <Button
            type='button'
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
            className='btn btn-block btn-success'
            style={{ fontSize: '22px', marginTop: '5px' }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
