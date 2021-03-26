import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Menus from '../components/Menus';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listMenus } from '../actions/menuActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const menuList = useSelector((state) => state.menuList);
  const { loading, menus, error } = menuList;

  useEffect(() => {
    dispatch(listMenus(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h2 className='text-center'>Breakfast</h2>
          <Row className='d-flex justify-content-center text-center'>
            {menus
              .filter((menu) => menu.category === 'Breakfast')
              .map((menu) => (
                <Col key={menu._id} sm={12} md={6} lg={4} xl={3}>
                  <Menus menus={menu} />
                </Col>
              ))}
          </Row>
          <h2 className='text-center'>Lunch</h2>
          <Row className='d-flex justify-content-center text-center'>
            {menus
              .filter((menu) => menu.category === 'Lunch')
              .map((menu) => (
                <Col key={menu._id} sm={12} md={6} lg={4} xl={3}>
                  <Menus menus={menu} />
                </Col>
              ))}
          </Row>
          <h2 className='text-center'>Dinner</h2>
          <Row className='d-flex justify-content-center text-center'>
            {menus
              .filter((menu) => menu.category === 'Dinner')
              .map((menu) => (
                <Col key={menu._id} sm={12} md={6} lg={4} xl={3}>
                  <Menus menus={menu} />
                </Col>
              ))}
          </Row>{' '}
        </>
      )}
    </>
  );
};

export default HomeScreen;
