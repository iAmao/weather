import faker from 'faker';
import {
	createActionTypes,
	wrapReducer,
	createAsyncSaga,
	CustomAxios,
	getAllKeysValue,
	normalizeByKey
} from '../util';
import { call, put } from 'redux-saga/effects';


describe('Store', () => {
	describe('Util', () => {
		describe('createActionTypes', () => {
			test('Should convert array of string into object of equal value', () => {
				const list = faker.random.arrayElements()
				const result = createActionTypes(list);

				list.forEach((item) => {
					expect(result).toHaveProperty(item);
					expect(result[item]).toEqual(item);
				});
			});

			test('Should convert array of string into object of equal value along with 3 modified entries', () => {
				const list = faker.random.arrayElements()
				const result = createActionTypes(list, true);

				list.forEach((item) => {
					expect(result).toHaveProperty(item);
					expect(result[item]).toEqual(item);
					expect(result).toHaveProperty(`${item}__PENDING`);
					expect(result).toHaveProperty(`${item}__SUCCESS`);
					expect(result).toHaveProperty(`${item}__FAILED`);
					expect(result[`${item}__PENDING`]).toEqual(`${item}__PENDING`);
					expect(result[`${item}__SUCCESS`]).toEqual(`${item}__SUCCESS`);
					expect(result[`${item}__FAILED`]).toEqual(`${item}__FAILED`);
				});
			});
		});

		describe('wrapReducer', () => {
			const initialState = {
	      bgColor: 'red',
	      username: null,
	      isLoading: false,
	      waiting: false,
	      error: null
	    };

	    const mockfns = {
	      changeBg: jest.fn(),
	      changeUsernameSuccess: jest.fn(),
	      changeUsernamePending: jest.fn(),
	      changeUsernameFailed: jest.fn()
	    };

	     const reducerObject = {
	      CHANGE_BG_COLOR: (draft, payload) => {
	        mockfns.changeBg();
	        draft.bgColor = payload.bgColor;
	      },
	      CHANGE_USERNAME__PENDING: (draft, { waiting }) => {
	        mockfns.changeUsernamePending();
	        draft.waiting = waiting;
	      },
	      CHANGE_USERNAME__SUCCESS: (draft, { response }) => {
	        mockfns.changeUsernameSuccess();
	        draft.username = response.username;
	      },
	      CHANGE_USERNAME__FAILED: (draft, { response }) => {
	        mockfns.changeUsernameFailed();
	        draft.error = response.error;
	      }
	    };

			const reducer = wrapReducer(reducerObject, initialState);
			const statesChangelog = [];

	    test('should return a reducer function', () => {
	      expect(reducer.constructor).toEqual(Function);
	    });

	    test('should change bgColor property of the state', () => {
	      const newState = reducer(initialState, {
	        type: 'CHANGE_BG_COLOR',
	        payload: {
	          bgColor: 'green'
	        }
	      });

	      expect(initialState.bgColor).toEqual('red');
	      expect(newState.bgColor).toEqual('green');
	      expect(mockfns.changeBg).toHaveBeenCalled();
	    });

	    test('should change "waiting" property of the state', () => {
	    	const lastModifiedState = statesChangelog[statesChangelog.length - 1];
	      const newState = reducer(lastModifiedState, {
	        type: 'CHANGE_USERNAME__PENDING',
	        payload: {
	          waiting: true
	        }
	      });

	      expect(initialState.waiting).toEqual(false);
	      expect(newState.waiting).toEqual(true);
	      expect(mockfns.changeUsernamePending).toHaveBeenCalled();
	    });

	    test('should change "username" property of the state', () => {
	    	const lastModifiedState = statesChangelog[statesChangelog.length - 1];
	      const newState = reducer(lastModifiedState, {
	        type: 'CHANGE_USERNAME__SUCCESS',
	        payload: {
	          response: {
	          	username: 'Houndmouth',
	          }
	        }
	      });

	      expect(initialState.username).toEqual(null);
	      expect(newState.username).toEqual('Houndmouth');
	      expect(mockfns.changeUsernameSuccess).toHaveBeenCalled();
	    });
		});

		describe('createAsyncSaga', () => {
			let callback = () => call(() => {});
			const action = {
			  type: 'PENDING',
			  payload: { payload: 'PENDING' },
			};

			 test('should dispatch a success type', () => {
		    callback = jest.fn().mockReturnValue({
		      data: 'logged!',
		    });
		    const generator = createAsyncSaga('SUCCESS', 'FAILED', callback)(action);
		    const response = generator.next().value;
		    expect(generator.next(response).value).toEqual(
		      put({
		        type: 'SUCCESS',
		        pendingPayload: action.payload,
		        payload: { response: 'logged!' },
		      }),
		    );
		  });

		  test('should dispatch a failure type', () => {
		    class CustomError extends Error {
		      response: {};
		      constructor(msg: string, response?: {}) {
		        super(msg);
		        this.response = response;
		      }
		    }

		    callback = jest.fn().mockImplementation(() => {
		      throw new CustomError('generator failed', { data: 'async saga failed' });
		    });
		    let gen = createAsyncSaga('SUCCESS', 'FAILED', callback)(action);
		    expect(gen.next().value).toEqual(
		      put({
		        type: 'FAILED',
		        payload: {
		          message: 'generator failed',
		          response: 'async saga failed',
		        },
		        pendingPayload: action.payload,
		      }),
		    );

		    callback = jest.fn().mockImplementation(() => {
		      throw new CustomError('generator failed again');
		    });
		    gen = createAsyncSaga('SUCCESS', 'FAILED', callback)(action);
		    expect(gen.next().value).toEqual(
		      put({
		        type: 'FAILED',
		        payload: {
		          message: 'generator failed again',
		        },
		        pendingPayload: action.payload,
		      }),
		    );
		  });
		});

		describe('CustomAxios', () => {
			const api = new CustomAxios();
			api.axiosInstance.request = jest.fn();

			describe('setHeader', () => {
		    test('should set headers correctly', () => {
		      api.setHeader('Authorization', 'fooBar');
		      expect(api.axiosInstance.defaults.headers.common.Authorization).toEqual(
		        'fooBar'
		      );
		    });
  		});

  		describe('deleteHeader', () => {
		    test('should delete a header', () => {
		      const headerKey = 'x-access-token';
		      api.setHeader(headerKey, '123');
		      expect(api.axiosInstance.defaults.headers.common[headerKey]).toEqual(
		        '123'
		      );

		      api.deleteHeader(headerKey);
		      expect(api.axiosInstance.defaults.headers.common[headerKey]).toBe(
		        undefined
		      );
		    });
		  });

		  describe('request', () => {
		    test('should make request with config', () => {
		      const config = {};
		      const spy = jest.spyOn(api.axiosInstance, 'request');
		      api.request(config);
		      expect(spy).toBeCalledWith(config);
		    });
  		});

  		describe('get', () => {
		    test('should make a GET request', () => {
		      const config = {};
		      const spy = jest.spyOn(api.axiosInstance, 'get');
		      api.get('/cats', config);
		      expect(spy).toBeCalledWith('/cats', config);
		    });
		  });
		});

		describe('getAllKeysValue', () => {
			test('should return all values in the right order', () => {
				const validResult = [];
				const dump = []
				Array.from(Array(16)).forEach(() => {
					let id = faker.random.number();
					while (validResult.includes(id)) {
						id = faker.random.number();
					}
					validResult.push(id);
					dump.push({
						...faker.random.objectElement(),
						id,
					});
				});

				const result = getAllKeysValue(dump, 'id');
				expect(result).toEqual(validResult);
			});
		});

		describe('normalizeByKey', () => {
			test('should normalize and array of objects using a specified key\'s value', () => {
				const validResult = [];
				const dump = []
				Array.from(Array(16)).forEach(() => {
					let id = faker.random.number();
					while (validResult.includes(id)) {
						id = faker.random.number();
					}
					validResult.push(id);
					dump.push({
						...faker.random.objectElement(),
						id,
					});
				});

				const result = normalizeByKey(dump, 'id');
				dump.forEach((d) => {
					expect(result[d.id]).toEqual(d);
				});
			});
		});
	});
})