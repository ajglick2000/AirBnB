import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

<<<<<<< HEAD
import sessionReducer from './session';
import spotsReducer from './spots';
=======
import sessionReducer from "./session";
import spotsReducer from "./spots";
>>>>>>> 3e886e516de996ba78782878ff103c0d791b21e0

const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default function configureStore(preloadedState) {
    return createStore(rootReducer, preloadedState, enhancer);
}
