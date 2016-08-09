/**
 * Created by liwanchong on 2016/8/2.
 */

const Helper = {
  bindMethod: (obj) => {
    const prototype = Object.getPrototypeOf(obj);
    const members = Object.getOwnPropertyNames(prototype);
    for (const member of members) {
      if (typeof (obj[member]) === 'function') {
        if (!Helper.isReactLifeCycleMethod(member)) {
          /* eslint-disable no-param-reassign */
          obj[member] = obj[member].bind(obj);
          /* eslint-disable no-param-reassign */
        }
      }
    }
  },

  isReactLifeCycleMethod: (methodName) => {
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
  },
};

export default Helper;
