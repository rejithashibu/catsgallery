import { combineReducers } from 'redux';
import CatsReducer from './CatsReducer';

const reducers = combineReducers({
    catsReducer: CatsReducer
})

export default reducers;
