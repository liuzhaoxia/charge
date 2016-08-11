/**
 * Created by liwanchong on 2016/8/2.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RootReducer from '../reducers/rootReducer';

const middleware = [thunkMiddleware];
const Store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunkMiddleware)
  )
);

export default Store;
