/**
 * Created by liwanchong on 2016/8/2.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import RootReducer from '../reducers/rootReducer';

function configStore() {
  const middleware = [thunkMiddleware, createLogger()];
  const store = createStore(
    RootReducer,
    compose(
      applyMiddleware(thunkMiddleware)
    )
  );

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(RootReducer);
    });
  }
  return store;
}

const ReduxStore = configStore();

export default ReduxStore;
