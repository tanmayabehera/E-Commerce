import authReducer from './auth.reducers';
import userReducer from './user.reducers';
import orderReducer from './order.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import pageReducer from'./page.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
})  

export default rootReducer;