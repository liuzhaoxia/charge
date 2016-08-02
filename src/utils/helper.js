/**
 * Created by liwanchong on 2016/8/2.
 */
const helper = {
    bindMethod: (obj)=> {
        const members = Object.getOwnPropertyNames(obj.__proto__);
        for (let member of members) {
            if (typeof(obj[member]) === 'function') {
                if (!helper.isReactLifeCycleMethod(member)) {
                    obj[member] = obj[member].bind(obj);
                }
            }
        }
    },

    isReactLifeCycleMethod: (methodName)=> {
        switch (methodName) {
            case 'getInitialState':
            case 'getDefaultProps':
            case 'componentWillMount':
            case 'componentDidMount':
            case 'componentWillReceiveProps':
            case 'shouldComponentUpdate':
            case 'componentWillUpdate':
            case 'componentDidUpdate':
            case 'componentWillUnmount':
            case 'constructor':
                return true;
            default :
                return false;
        }
    }
};

export default helper;
