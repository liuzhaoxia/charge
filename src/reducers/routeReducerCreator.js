/**
 * Created by wangtun on 2016/7/21.
 */
import { Reducer } from 'react-native-router-flux';

const routeReducerCreator = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

export default routeReducerCreator;