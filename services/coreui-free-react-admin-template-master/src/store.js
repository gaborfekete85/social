import { createStore, applyMiddleware } from "redux";
import onStateChange from 'redux-on-state-change'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const myFunc = (prevState, nextState, action, dispatch) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      dispatch({
        type: 'LOGIN_SUCCEEDED',
        payload: {}
      })
    break
  }
}

const store = createStore(
  rootReducer,
  //composeWithDevTools(applyMiddleware(...middleware)),
  composeWithDevTools(applyMiddleware(...middleware, onStateChange(myFunc)))
);

export default store;
