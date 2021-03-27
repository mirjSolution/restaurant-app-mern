import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import Menus from '../components/Menus';
import Message from '../components/Message';
import Loader from '../components/Loader';
import MenuCarousel from '../components/MenuCarousel';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import video from '../videos/video1.mp4';
import { listMenus } from '../actions/menuActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const menuList = useSelector((state) => state.menuList);
  const { loading, menus, error, page, pages } = menuList;

  useEffect(() => {
    dispatch(listMenus(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <div className='homepage-video'>
        <video style={{ top: -80, zIndex: -1 }} id='video' autoPlay muted loop>
          <source src={video} />
        </video>
      </div>
      <div className='text-over-video'>
        <h1 className='food-title'>FOOD CRAVINGS</h1>
        <h2 className='food-subtitle'>Eat Well, Pray Often, Love Always</h2>
        <Link to='/ordernow' className='btn btn-primary'>
          Order Now
        </Link>
      </div>
      <Container>
        {!keyword ? (
          <>
            <h2>TOP RATED</h2>
            <MenuCarousel />
          </>
        ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h2>OUR MENUS</h2>
            <Row className='d-flex justify-content-center text-center'>
              {menus.map((menu) => (
                <Col key={menu._id} sm={12} md={6} lg={4} xl={3}>
                  <Menus menus={menu} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
