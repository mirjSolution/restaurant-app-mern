import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMenuDetails, createMenuReview } from '../actions/menuActions';
import { MENU_CREATE_REVIEW_RESET } from '../constants/menuConstants';

const MenuScreen = ({ history, match }) => {
  const [order, setOrder] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const menuDetails = useSelector((state) => state.menuDetails);
  const { loading, error, menu } = menuDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const menuReviewCreate = useSelector((state) => state.menuReviewCreate);
  const {
    success: successMenuReview,
    loading: loadingMenuReview,
    error: errorMenuReview,
  } = menuReviewCreate;

  useEffect(() => {
    if (successMenuReview) {
      setRating(0);
      setComment('');
    }
    if (!menu._id || menu._id !== match.params.id || successMenuReview) {
      dispatch(listMenuDetails(match.params.id));
      dispatch({ type: MENU_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successMenuReview, menu._id]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?order=${order}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createMenuReview(match.params.id, {
        userId: userInfo._id,
        name: userInfo.name,
        rating,
        comment,
      })
    );
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
        <>
          <Row>
            <Col md={6}>
              <Image src={menu.image} alt={menu.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{menu.name}</h3>
                  <Rating
                    value={menu.rating}
                    text={`${menu.numReviews} Reviews`}
                  />
                </ListGroup.Item>
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {menu.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {menu.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successMenuReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingMenuReview && <Loader />}
                  {errorMenuReview && (
                    <Message variant='danger'>{errorMenuReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingMenuReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/signin'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MenuScreen;
