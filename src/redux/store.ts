import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Reducer} from './reducers/Reducer';

const rootReducer = combineReducers({
  reducer: Reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export {store};
