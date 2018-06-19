import { createAsyncAction } from '../../common/utils.js'

export const queryExpress = createAsyncAction('QUERY_EXPRESS', '/api/expressage/query', { method: 'get' });
