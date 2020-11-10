import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../modules';
import {alertsMiddleware} from '../middleware/alertsMiddleware';
import { createLogger } from 'redux-logger';

const store=createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk,alertsMiddleware,createLogger))
);


export default store;
