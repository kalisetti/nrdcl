import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import commonReducer from './reducers/commonReducer';

const rootReducer = combineReducers({
	userState: userReducer,
	commonState: commonReducer,
});

let composeEnhancer = compose;
if (__DEV__) {
	composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
	return createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
};

export default configureStore;
