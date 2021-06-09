import { SELECT_FUNCTIONALITY, BOOKING_DELETED, BOOKING_SAVED, SELECT_SERVICE, UPDATE_PRICE_LIST_ITEM, BOOKINGS_QUERIED, PRICE_LIST_ITEM_DELETED, PRICE_LIST_QUERIED, NEW_PRICE_LIST_ITEM, SERVICES_FILTERED, SWITCH_MODE, SELECT_SERVICE_PROVIDER, RESTAURANT_QUERIED } from "../actions/types";

const initialState = {
  bookings: [],
  mode: 'book',
  service: null, 
  wizardSelectedFunctionality: '',
  wizardSelectedService: '',
  currentServices: [],
  priceList: [
    //{
    //  serviceId: '-MVBPwyOFsSerKlGmY_y',
    //  id: 1,
    //  name: 'Ferfi hajvagas',
    //  length: 35, 
    //  price: 3000, 
    //  symbol: 'HUF'
    //},
    //{
    //  serviceId: '-MVBPwyOFsSerKlGmY_y',
    //  id: 2,
    //  name: 'Noi hajvagas',
    //  length: 120, 
    //  price: 25000, 
    //  symbol: 'HUF'
    //}
  ],
  currencies: [
    {
      name: 'Forint', 
      symbol: 'HUF', 
    }, 
    {
      name: 'Euro', 
      symbol: 'EUR', 
    }, 
    {
      name: 'United States dollas', 
      symbol: 'USD', 
    }, 
    {
      name: 'Japanese yen', 
      symbol: 'JPY', 
    }, 
    {
      name: 'Australian dollar', 
      symbol: 'AUD', 
    },
    {
      name: 'Canadian dollar', 
      symbol: 'CAD', 
    },
    {
      name: 'Swiss franc', 
      symbol: 'CHF', 
    }
  ]
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    
    case SELECT_FUNCTIONALITY: {
      return {
        ...state,
        wizardSelectedFunctionality: action.payload
      };
    }

    case UPDATE_PRICE_LIST_ITEM: {
      return {
        ...state,
        priceList: state.priceList.map( x => x.id === action.payload.id ? action.payload : x)
      };
    }

    case BOOKING_SAVED: {
      return {
        ...state,
        bookings: state.bookings.concat(action.payload)
      };
    }

    case BOOKING_DELETED: {
      //alert(JSON.stringify(state.bookings));
      ////alert("Key: " + action.payload);
      //alert(JSON.stringify(state.bookings.filter( x => x.id !== action.payload)[0]));

      return {
        ...state
        ,bookings: state.bookings.filter( x => x && x.id && x.id !== action.payload)
      };
    }
    
    case BOOKINGS_QUERIED: {
      console.log("Bookings queried in the global reducer: " + JSON.stringify(action.payload))
      return {
        ...state,
        bookings: action.payload
      };
    }

    case PRICE_LIST_QUERIED: {
      return {
        ...state,
        priceList: action.payload
      };
    }

    case PRICE_LIST_ITEM_DELETED: {
      return {
        ...state,
        priceList: state.priceList.filter( x => x.id !== action.payload)
      };
    }

    case NEW_PRICE_LIST_ITEM: {
      return {
        ...state,
        priceList: state.priceList.concat(action.payload)
      };
    }

    case RESTAURANT_QUERIED: {
      return {
        ...state,
        service: state.service === null ? action.payload[0] : state.service
      };
    }

    case SERVICES_FILTERED: {
      return {
        ...state,
        currentServices: action.payload
      };
    }
    
    case SWITCH_MODE: {
      return {
        ...state,
        mode: (state.mode === 'book') ? 'prov' : 'book'
      };
    }

    case SELECT_SERVICE_PROVIDER: {
      return {
        ...state,
        service: action.payload
      };
    }

    case SELECT_SERVICE: {
      return {
        ...state,
        wizardSelectedService: action.payload
      };
    }
    
    default:
      return state;
  }
}
