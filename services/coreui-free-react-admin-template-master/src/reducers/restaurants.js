import { RESTAURANT_SAVED, RESTAURANT_QUERIED } from "../actions/types";

const initialState = {
  list: [
    {
      id: "1",
      name: "RokaGomba",
      email: 'gabor.feket85_1@gmail.com',
      phone: '+36-70/434-3065',
      address: 'Budapest, Erzsébet krt. 43-49, 1073',
      web: 'https://rokagomba.com',
      active: false
    }
  ],
  currentService: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log('payload: ' + action.payload);
  switch (action.type) {
    case RESTAURANT_SAVED:
      return {
        ...state,
        list: state.list.concat(payload)
    };

    case RESTAURANT_QUERIED: {
      return {
        ...state,
        list: action.payload,
        currentBusiness: action.payload && action.payload.length > 0 ? action.payload[0] : null
      };
    }
    
    default:
      return state;
  }
}
