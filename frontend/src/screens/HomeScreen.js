import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Menus from '../components/Menus';
import menus from '../menus';

const HomeScreen = () => {
  return (
    <>
      <h2 className='text-center'>Breakfast</h2>
      <Row className='d-flex justify-content-center text-center'>
        {menus
          .filter((menu) => menu.category === 'Breakfast')
          .map((menu) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Menus menus={menu} />
            </Col>
          ))}
      </Row>
      <h2 className='text-center'>Lunch</h2>
      <Row className='d-flex justify-content-center text-center'>
        {menus
          .filter((menu) => menu.category === 'Lunch')
          .map((menu) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Menus menus={menu} />
            </Col>
          ))}
      </Row>
      <h2 className='text-center'>Dinner</h2>
      <Row className='d-flex justify-content-center text-center'>
        {menus
          .filter((menu) => menu.category === 'Dinner')
          .map((menu) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Menus menus={menu} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default HomeScreen;
