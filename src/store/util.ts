import produce from 'immer';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Dispatch } from 'redux';
import { CallEffect, put } from 'redux-saga/effects';
import { GenericObject } from '../types';
import { ActionPayload, ResponsePayload } from './types';

const spread = produce(Object.assign);

export interface ReducerCase<T> {
  [key: string]: (
    draft: T,
    payload: ResponsePayload,
    pendingPayload?: ActionPayload,
  ) => void;
}

export function createActionTypes(actions: string[], isAsync = false) {
  return actions.reduce((acc: GenericObject<string>, action) => {
    acc[action] = action;
    if (isAsync) {
      acc[`${action}__PENDING`] = `${action}__PENDING`;
      acc[`${action}__SUCCESS`] = `${action}__SUCCESS`;
      acc[`${action}__FAILED`] = `${action}__FAILED`;
    }

    return acc;
  }, {});
}

export function wrapReducer<T>(
  cases: ReducerCase<T>,
  initialState: T,
) {
  return (state = initialState, action: any): T => {
    return produce(state, (draft: T) => {
      if (!cases[action.type]) {
        return spread(state, {});
      }

      spread(
        state,
        cases[action.type](draft, action.payload, action.pendingPayload),
      );
    });
  };
}


/**
 * @name createAsyncSaga
 * Create a new function to dispatch actions
 * action of type SUCCESS is dispatched if the request was successful
 * action of type FAILED is dispatched if the request failed due to user error or system error.
 *
 * @param {string} success action type string for success
 * @param {string} errorType action type string for error
 * @param {(action: IAction) => CallEffect} req
 * @param {{ success: object; error: object }} [payloadOverrides]
 * @returns closure that dispatches actions
 */
export function createAsyncSaga(
  successType: string,
  errorType: string,
  req: (action: any) => CallEffect | undefined,
  payloadOverrides?: { success?: object; error?: object },
) {
  return function*(action: any) {
    const pendingPayload = action.payload;
    const payload: ResponsePayload = {};
    try {
      // Make Async request
      const response = yield req(action);

      // Create base payload for successful operation.
      // If response object exist then information we need will be inside of data property
      payload.response = response ? response.data : response;

      // Override current payload with options from payloadOverrides if specified
      // if (payloadOverrides && payloadOverrides.success) {
      //   payload = { ...payload, ...payloadOverrides.success };
      // }

      // Dispatch success action with payload from response and payload from the __PENDING action
      yield put({ payload, pendingPayload, type: successType });
    } catch (e) {
      payload.message = e.message;
      // payload.message = e.message;

      // If error is related to the async operation extract the rejected value
      if (e.response) {
        // @ts-ignore
        // payload.set('response', e.response.data);
        payload.response = e.response.data;
      }

      // Override current payload with options from payloadOverrides if specified
      // if (payloadOverrides && payloadOverrides.error) {
      //   payload = { ...payload, ...payloadOverrides.error };
      // }

      // if (payload.isAuthError && payload.isRefreshingAuth) {
      //   payload.types = {
      //     type: action.type,
      //     errorType,
      //     successType,
      //   };
      //   yield put({ payload, pendingPayload, type: 'SESSION_EXPIRED' });
      // } else {
        // Dispatch error action with error information, and payload from the __PENDING action
        yield put({ payload, pendingPayload, type: errorType });
      // }
    }
  };
}


// @ts-ignore
// import * as actions from '../store/auth/actions';
// import storageUtils from '../util/storage';
// TODO: Implement global queue for failed request


export class CustomAxios {
  public axiosInstance: AxiosInstance;
  constructor(baseURL: string, setInterceptors = true) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    if (setInterceptors) {
      this.axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          const AUTH_TOKEN = 'storageUtils.getAccessToken()';

          if (AUTH_TOKEN) {
            config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
          }
          config.headers['X-Goodlight-client'] = 'web';
          return config;
        },
      );
      // Response interceptors goes here
    }
  }

  public setHeader = (key: string, value: string) => {
    this.axiosInstance.defaults.headers.common[key] = value;
  };

  public deleteHeader = (key: string) => {
    delete this.axiosInstance.defaults.headers.common[key];
  };

  public request = (config: AxiosRequestConfig): AxiosPromise => {
    return this.axiosInstance.request(config);
  };

  public get = (url: string, config?: AxiosRequestConfig): AxiosPromise => {
    return this.axiosInstance.get(url, config);
  };

  public post = (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise => {
    return this.axiosInstance.post(url, data, config);
  };

  public put = (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise => {
    return this.axiosInstance.put(url, data, config);
  };
  public patch = (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise => {
    return this.axiosInstance.patch(url, data, config);
  };
}

export function getAllKeysValue(list: GenericObject<any>[], key: string) {
  return list.map((item) => item[key]);
}

export function normalizeByKey<V>(
  list: GenericObject<any>[],
  key: string
): GenericObject<V> {
  return list.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {} as GenericObject<V>);
}

export function sortResponseData(
  list: Array<GenericObject<any>>,
  key: string,
  sortDirection: 'asc' | 'desc'
) {
  list.sort((a: GenericObject<any>, b: GenericObject<any>) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (nameA > nameB) {
      return sortDirection === 'asc' ? 1 : -1;
    }

    return 0;
  });
  return list;
}
