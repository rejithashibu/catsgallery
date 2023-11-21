import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CatsReducer from '../reducers/CatsReducer';

const reducer = combineReducers({
    cats: CatsReducer
});

const initialState = {};

const middleWare = [thunk];

export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleWare)
);
