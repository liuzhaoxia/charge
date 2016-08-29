/**
 * Created by liwanchong on 2016/8/2.
 */
const FetchMethod = {
  Get: 'GET',
  Post: 'POST',
};

function jsonToQueryString(jsonObj) {
  let queryStr = '';
  Object.keys(jsonObj).forEach(key => {
    let value;
    if (typeof jsonObj[key] === 'object') {
      value = JSON.stringify(jsonObj[key]);
    } else {
      value = jsonObj[key];
    }
    queryStr += `${key}=${value}&`;
  });

  if (queryStr.endsWith('&')) {
    queryStr = queryStr.substr(0, queryStr.length - 1);
  }

  return queryStr;
}

function createFetch(url, method, jsonObj) {
  switch (method) {
    case FetchMethod.Get:
      {
        const queryStr = jsonToQueryString(jsonObj);
        const urlWithQueryStr = `${url}?${queryStr}`;
        const options = {
          method: FetchMethod.Get,
        };
        // console.log(urlWithQueryStr);
        return fetch(urlWithQueryStr, options);
      }
    case FetchMethod.Post:
      {
        const queryStr = JSON.stringify(jsonObj);
        const options = {
          method: FetchMethod.Post,
          body: queryStr,
        };
        // console.log(url);
        // console.log(queryStr);
        return fetch(url, options);
      }
    default:
      throw new Error(`not support method ${method}`);
  }
}

export {
  FetchMethod,
  createFetch,
};
