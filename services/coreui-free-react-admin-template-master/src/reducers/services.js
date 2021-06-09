import { RESTAURANT_QUERIED } from "../actions/types";

const initialState = {
  list: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {

    case RESTAURANT_QUERIED: {
      return {
        ...state,
        list: action.payload
      };
    }

    default:
      return state;
  }
}
