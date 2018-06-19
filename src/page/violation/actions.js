import { createAsyncAction } from '../../common/utils.js'

export const queryViolationRecords = createAsyncAction('QUERY_RECORDS', '/api/vehicle/get', { method: "get" });

export const addCar = createAsyncAction('ADD_CAR', '/api/vehicle/add', { method: "post" });

export const updateCar = createAsyncAction('UPDATE_CAR', '/api/vehicle/update', { method: "post" });

export const deleteCar = createAsyncAction('DELETE_CAR', '/api/vehicle/delete', { method: "post" });

export const queryCar = createAsyncAction('QUREY_CAR', '/api/vehicle/get/id', { method: "get" });

export const countCar = createAsyncAction('COUNT_CAR', '/api/vehicle/count', { method: "get" });


