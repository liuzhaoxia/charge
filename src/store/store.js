/**
 * Created by liwanchong on 2016/8/2.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer'

const middleware = [thunkMiddleware];
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;
