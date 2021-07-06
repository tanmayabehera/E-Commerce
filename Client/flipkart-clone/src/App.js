import './App.css';
import HomePage  from './containers/HomePage';
import{ BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate])



  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
