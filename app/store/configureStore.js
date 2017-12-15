import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger();

import rootSaga from '../routes/Sagas';
console.log(rootSaga, 'root saga....');
const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
    const middlewares = [
        // Add other middleware on this line...
        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
        sagaMiddleware
    ];
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

function configureStoreDev(initialState) {
    const middlewares = [
        // Add other middleware on this line...
        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),
        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
        logger,
        sagaMiddleware
    ];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;
export default configureStore;
