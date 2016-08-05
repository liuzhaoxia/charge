/**
 * Created by wangtun on 2016/7/21.
 */
import { handleActions } from 'redux-actions'
import loginActions  from '../actions/loginActions'

const initialState = {
    logined: false
};

const loginReducer = handleActions({
    [loginActions.login]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.logined = true;
        return newState;
    }

}, initialState);

export default loginReducer;