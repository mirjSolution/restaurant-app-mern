import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Menus from '../components/Menus';
import Message from '../components/Message';
import Loader from '../components/Loader';
import MenuCarousel from '../components/MenuCarousel';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

import { listMenus } from '../actions/menuActions';

const HomeScreen = ({ match }) => {
  const [windowY, setWindowY] = useState(0);

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const menuList = useSelector((state) => state.menuList);
  const { loading, menus, error, page, pages } = menuList;

  useEffect(() => {
    dispatch(listMenus(keyword, pageNumber));
    setWindowY(window.pageYOffset);
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      {!keyword ? (
        <MenuCarousel />
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
            windowY={windowY}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
