import { createAsyncAction } from '../../common/utils.js'

export const getBehavior = createAsyncAction('GET_BEHAVIOR', '/api/service_bebavior/get', { method: 'get' });