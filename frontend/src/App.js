import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MenuListScreen from './screens/MenuListScreen';
import MenuEditScreen from './screens/MenuEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderNowScreen from './screens/OrderNowScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Route path='/' component={HomeScreen} exact />
      <Container>
        <Route path='/order/:id' component={OrderScreen} />
         
        <Route path='/shipping' component={ShippingScreen} />
         
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/ordernow' component={OrderNowScreen} exact />
        <Route
          path='/ordernow/page/:pageNumber'
          component={OrderNowScreen}
          exact
        />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/signin' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/menus/:id' component={MenuScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/admin/menu/:id/edit' component={MenuEditScreen} />
        <Route path='/admin/menulist' component={MenuListScreen} exact />
        <Route
          path='/admin/menulist/:pageNumber'
          component={MenuListScreen}
          exact
        />
        <Route path='/admin/orderlist' component={OrderListScreen} />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={OrderNowScreen}
        />
        <Route path='/search/:keyword' component={OrderNowScreen} exact />
      </Container>

      <Footer />
    </Router>
  );
};

export default App;
