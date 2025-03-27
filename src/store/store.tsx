/**
import { compose, applyMiddleware, Store, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { configureStore as createStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from 'redux-thunk';
import rootReducer from '../reducers/rootreducer';

// Define the root state type using the return type of the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Extend the Window interface to include __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// Use Redux DevTools compose if available, otherwise use Redux's compose
const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create the store with the rootReducer and apply thunk middleware
export const store: Store<RootState, AnyAction> = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk as ThunkMiddleware <RootState, AnyAction>)
    )
); 
* */