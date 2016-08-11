/**
 * Created by wangtun on 2016/7/21.
 */
import { handleActions } from 'redux-actions';
import LoginActions from '../actions/loginActions';

const initialState = {
  user: null,
};

const LoginReducer = handleActions({
  [LoginActions.setUser]: (state, action) => {
    const newState = Object.assign({}, state);
    newState.user = action.payload;
    return newState;
  },
}, initialState);

export default LoginReducer;
