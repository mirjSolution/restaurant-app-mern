import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopMenus } from '../actions/menuActions';

const MenuCarousel = () => {
  const dispatch = useDispatch();

  const menuTopRated = useSelector((state) => state.menuTopRated);
  const { loading, error, menus } = menuTopRated;

  useEffect(() => {
    dispatch(listTopMenus());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {menus.map((menu) => (
        <Carousel.Item key={menu._id}>
          <Link to={`/menus/${menu._id}`}>
            <Image src={menu.image} alt={menu.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {menu.name} (${menu.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MenuCarousel;
