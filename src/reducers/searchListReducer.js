import { handleActions } from 'redux-actions';
import SearchActions from '../actions/SearchActions';

const initialState = {
  searchListData: [],
};
const searchList = handleActions({
  [SearchActions.setChargeList]: (state, action) => {
    const newState = Object.assign({}, state);
    newState.searchListData = action.payload.data;
    return newState;
  },
}, initialState);
export default searchList;
