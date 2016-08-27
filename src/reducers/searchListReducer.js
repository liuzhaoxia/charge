import { handleActions } from 'redux-actions';
import SearchActions from '../actions/SearchActions';

const initialState = {
  searchListData: [],
};
const searchList = handleActions({
  [SearchActions.setChargeList]: (state, action) => {
    state = Object.assign({}, state);
    state.searchListData = action.payload.data;
    return state;
  },
}, initialState);
export default searchList;
