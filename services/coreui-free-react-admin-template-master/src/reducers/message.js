import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {
  restaurants: [
    {
      name: "RokaGomba",
      email: 'gabor.feket85_1@gmail.com',
      phone: '+36-70/434-3065',
      address: 'Budapest, Erzsébet krt. 43-49, 1073',
      web: 'https://rokagomba.com',
      active: false
    }
  ]
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
