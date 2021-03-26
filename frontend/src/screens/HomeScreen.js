import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Menus from '../components/Menus';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

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
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
