import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMenus, deleteMenu, createMenu } from '../actions/menuActions';
import { MENU_CREATE_RESET } from '../constants/menuConstants';

const MenuListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const menuList = useSelector((state) => state.menuList);
  const { loading, error, menus } = menuList;

  const menuDelete = useSelector((state) => state.menuDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = menuDelete;

  const menuCreate = useSelector((state) => state.menuCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    menu: createdMenu,
  } = menuCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: MENU_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('login');
    }
    if (successCreate) {
      history.push(`/admin/menu/${createdMenu._id}/edit`);
    } else {
      dispatch(listMenus());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdMenu._id,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteMenu(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createMenu());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Menus</h1>
        </Col>
        <Col className='text-right'>
          <Button
            variant='light'
            className='my-3 btn-outline-primary'
            onClick={createProductHandler}
          >
            <FaPlus color='gold' /> Create Menu
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu._id}>
                  <td>{menu._id}</td>
                  <td>{menu.name}</td>
                  <td>{menu.category}</td>
                  <td>${menu.price}</td>
                  <td className='text-center'>
                    <LinkContainer to={`/admin/menu/${menu._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit color='blue' />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => deleteHandler(menu._id)}
                    >
                      <FaTrash color='red' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default MenuListScreen;
