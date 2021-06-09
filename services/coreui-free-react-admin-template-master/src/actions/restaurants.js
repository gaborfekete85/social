import {
  RESTAURANT_SAVED, 
  RESTAURANT_QUERIED,
  SERVICES_FILTERED
} from "./types";

import { getPurePriceList, getBookingList, getBookingsById } from './global';

import RestaurantsDataService from "../services/restaurants.service";

export const deleteRestaurant = (key) => (dispatch) => {
  return RestaurantsDataService.delete(key);
  //  .on("value", (data) => {
  //    let dataValue = data.val();
  //    let convertedResponse = Object.keys(dataValue).map( x=> {
  //      return {
  //          id: x, 
  //          payload: JSON.parse(JSON.stringify(dataValue[x]))
  //      }
  //    });
  //    dispatch({
  //      type: RESTAURANT_QUERIED,
  //      "payload": convertedResponse
  //    });
  //    console.log("Restaurant successfully queried");
  //    return Promise.resolve();
  //  },
  //  (error) => {
  //    console.log("Query restaurants FAILED");
  //    const message =
  //      (error.response &&
  //        error.response.data &&
  //        error.response.data.message) ||
  //      error.message ||
  //      error.toString();
  //    return Promise.reject();
  //  }
  //);
};

function flatten(list) {
  return list.reduce(function (acc, val) {
    return acc.concat(val.constructor === Array ? flatten(val) : val);
  }, []);
}

export const getServicesByFunctionality = (functionality, callback) => (dispatch) => {
    return RestaurantsDataService.getServicesByFunctionality(functionality).on("value", (data) => {
      let dataValue = data.val();
      if(!dataValue) {
        return;
      }

      let convertedResponse = Object.keys(dataValue).map( x=> {
        return {
            id: x, 
            ...dataValue[x]
        }
      });

    convertedResponse = convertedResponse.filter( x => x.functionalities && x.functionalities.includes(functionality));
    let priceListPromises = [];
    convertedResponse.map( x => {
      priceListPromises.push(getPurePriceList(x.id));
    });
    Promise.all(priceListPromises)
    .then(responses => {
        return Promise.all(responses.map( response => {
          if(response.length > 0) {
            let service = convertedResponse.filter( x => x.id === response[0].serviceId)[0];
            service.priceList = response;
          }  
        }))
    })
    .then(body => {
      if(callback) {
        callback();
      }
      dispatch({
        type: SERVICES_FILTERED,
        "payload": convertedResponse,
      });
  })

  return Promise.resolve();

    //Promise.all(priceListPromises).then( x => {
    //  alert(JSON.stringify(x));
    //})
    

    //getPriceList(dataValue.serviceId).then( priceList => {
    //  convertedResponse.priceList = priceList;
    //  alert(JSON.stringify(convertedResponse));
    //  dispatch({
    //    type: SERVICES_FILTERED,
    //    "payload": convertedResponse,
    //  });
    //  return Promise.resolve();
    //})
    },
    (error) => {
      console.log("Persisting a new restaurant FAILED");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const loadRestaurants = (email, callback, currentService) => (dispatch) => {
  return RestaurantsDataService.getMyServices(email).on("value", (data) => {
      let dataValue = data.val();
      if(!dataValue) {
        return;
      }

      let convertedResponse = Object.keys(dataValue).map( x=> {
        return {
            id: x, 
            ...dataValue[x]
        }
      });
      //alert("cr: " + JSON.stringify(convertedResponse))

      dispatch({
        type: RESTAURANT_QUERIED,
        "payload": convertedResponse
      });
      //if(convertedResponse.length > 0) {
      //  dispatch(getBookingList((currentService) ? currentService : convertedResponse[0].id))
      //}
      callback();

      console.log("Restaurant successfully queried");
      return Promise.resolve();
    },
    (error) => {
      console.log("Query restaurants FAILED");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};


export const newRestaurant = (restaurant) => (dispatch) => {
  return RestaurantsDataService.create(restaurant).then((data) => {
      dispatch({
        type: RESTAURANT_SAVED,
        "payload": restaurant,
      });
      console.log("Restaurant successfully saved");
      return Promise.resolve();
    },
    (error) => {
      console.log("Persisting a new restaurant FAILED");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};
