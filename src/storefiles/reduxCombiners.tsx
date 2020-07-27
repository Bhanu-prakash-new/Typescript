import { combineReducers } from 'redux';
import ToDosReducer from './reducers';

const rootReducer = combineReducers({
  todoList: ToDosReducer,
});

export default rootReducer;