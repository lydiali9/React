import { createAsyncAction } from '../../common/utils.js'

export const getCode = createAsyncAction('GET_CODE', '/api/code/get', { method: 'get' });

export const login = createAsyncAction('LOGIN', '/api/user/login');

export const getUserInfo = createAsyncAction('USER_INFO', '/api/user/get', { method: 'get' });

export const updateUserInfo = createAsyncAction('UPDATE_USER_INFO', '/api/user/update', { method: 'post' });
