/**
 * Created by wangtun on 2016/7/21.
 */
import { handleActions } from 'redux-actions';
import UserManagementActions from '../actions/UserManagementActions';

const initialState = {
  user: null,
};

const UserManagementReducer = handleActions({
  [UserManagementActions.setUser]: (state, action) => {
    const newState = Object.assign({}, state);
    newState.user = action.payload;
    return newState;
  },
}, initialState);

export default UserManagementReducer;
