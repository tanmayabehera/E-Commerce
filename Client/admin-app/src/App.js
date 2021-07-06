
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Containers/Home';
import Signin from './Containers/Signin';
import Signup from './Containers/Signup';
import PrivateRoute from './Components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getInitialData, isUserLoggedIn } from './actions';
import { useEffect } from 'react';
import Products from './Containers/Products';
import Orders from './Containers/Orders';
import Category from './Containers/Category';
import NewPage from './Containers/NewPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
    dispatch(getInitialData());
    }
  }, [auth.authenticate])


  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} ></PrivateRoute>
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />



        <Route path="/signin" exact component={Signin} ></Route>
        <Route path="/signup" exact component={Signup} ></Route>
      </Switch>
    </div>
  );
}

export default App;
