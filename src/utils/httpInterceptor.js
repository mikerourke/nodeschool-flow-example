// @flow
import fetchIntercept from 'fetch-intercept';
import isNil from 'lodash/isNil';
import set from 'lodash/set';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// This is a custom type for the configuration object that gets passed into
// the request interceptor.
type FetchConfig = {
  headers?: {
    [name: string]: string,
  },
  body?: Object,
};

/**
 * This is a custom error that extends the built-in JavaScript Error
 * object.
 */
class ResponseError extends Error {
  errorCode: number;

  constructor(response: any, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError);
    }

    this.errorCode = response.status;
    this.description = response.statusText;
  }
}

export default function initInterceptor() {
  return fetchIntercept.register({
    request(url: string, config: FetchConfig = {}) {
      // We don't have to specify `string` here because Flow infers the type:
      let requestUrl = url;

      /**
       * This prepends the API URL to any fetch requests, so we don't have to
       * specify the entire URL, just the specific endpoint
       * (e.g. /transactions):
       */
      if (!/https?:\/\//.test(url)) {
        if (url.substring(0, API_BASE_URL.length) !== API_BASE_URL) {
          requestUrl = API_BASE_URL + requestUrl;
        }
      }

      const requestConfig = {
        ...config,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...config.headers,
        },
      };

      /**
       * Flow will throw errors if we don't check for the existence of the
       * `body` property on the `config` object. We're using lodash's `set`
       * method because it will add the `body` property to the requestConfig
       * if it doesn't exist:
       */
      if (!isNil(config.body)) {
        set(requestConfig, 'body', JSON.stringify(config.body));
      }

      return [requestUrl, requestConfig];
    },

    /**
     * This returns the result of the .json() or .text() function on the
     * incoming response. Otherwise, we'd have to add that step to every fetch
     * call:
     */
    response(response: Response) {
      if (!response.ok) {
        throw new ResponseError(response);
      }
      const type = response.headers.get('content-type');
      if (/application\/json/.test(type)) {
        return response.json();
      }
      return response.text();
    },
  });
}
