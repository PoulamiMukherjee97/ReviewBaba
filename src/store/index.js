import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CommonReducer from '../reducers';

const rootReducer = combineReducers({
    CommonReducer
  })
  
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;