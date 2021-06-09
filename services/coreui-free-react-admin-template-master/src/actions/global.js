import {
    SWITCH_MODE,
    SELECT_SERVICE_PROVIDER, 
    SELECT_SERVICE, 
    NEW_PRICE_LIST_ITEM, 
    PRICE_LIST_QUERIED,
    PRICE_LIST_ITEM_DELETED,
    UPDATE_PRICE_LIST_ITEM,
    BOOKINGS_QUERIED,
    SELECT_FUNCTIONALITY
  } from "./types";
  
  import RestaurantsDataService from "../services/restaurants.service";
  import PriceListDataService from "../services/pricelists";
  import BookingsDataService from "../services/bookings.service";
  import JavaBookingsDataService from "../services/bookings.service.java";
  import { getServicesByFunctionality } from "actions/restaurants";

  export const switchMode = () => (dispatch) => {
        dispatch({
          type: SWITCH_MODE,
          "payload": ""
        });
  };
  
  export const selectFunctionality = (functionality, callback) => (dispatch) => {
    dispatch(getServicesByFunctionality(functionality.id, () => { callback() } ));
    dispatch({
      type: SELECT_FUNCTIONALITY,
      "payload": functionality
    });
  }

  export const selectServiceProvider = (serviceProvider, callback) => (dispatch) => {
    dispatch(getPriceList(serviceProvider.id));
    dispatch(getBookingList(serviceProvider.id));
    //alert(JSON.stringify(serviceProvider));

    dispatch({
      type: SELECT_SERVICE_PROVIDER,
      "payload": serviceProvider
    });
    if(callback) {
      callback();
    }
  }

  export const selectServiceWizard = (service, callback) => (dispatch) => {
    dispatch({
      type: SELECT_SERVICE,
      "payload": service
    });
    if(callback) {
      callback();
    }
  }
  
  
  export const deletePriceListItem = (priceListItemId) => (dispatch) => {
    return PriceListDataService.delete(priceListItemId).then((data) => {
        dispatch({
          type: PRICE_LIST_ITEM_DELETED,
          "payload": priceListItemId,
        });
        console.log("Price list item successfully deleted");
        return Promise.resolve();
      },
      (error) => {
        console.log("Deleting a new price list item FAILED");
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject();
      }
    );
}

export const handleError = (error) => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.log('Error: ' + message);
    return Promise.reject();
  }
  
  export const persistNewPriceListItem = (serviceListItem, dispatch) => {
    return PriceListDataService.create(serviceListItem).then((data) => {
      //alert("DAATA: " + data);
      let splits = new String(data).split('/');
      serviceListItem.id = splits[splits.length-1];
      dispatch({
          type: NEW_PRICE_LIST_ITEM,
          "payload": serviceListItem,
        });
        return Promise.resolve();
      },
      (error) => handleError(error)
    );
  }

  export const updatePriceListItem = (serviceListItem, dispatch) => {
    let serviceListItemId = serviceListItem.id;
    //delete serviceListItem['id'];
    return PriceListDataService.update(serviceListItemId, serviceListItem).then((data) => {
      serviceListItem.id = serviceListItemId;
      dispatch({
          type: UPDATE_PRICE_LIST_ITEM,
          "payload": serviceListItem,
        });
        return Promise.resolve();
      },
      (error) => handleError(error)
    );
  }

  export const upSertPriceListItem = (serviceListItem) => (dispatch) => {
      console.log('serviceListItem: ' + JSON.stringify(serviceListItem));
      
      return (serviceListItem.id) ? updatePriceListItem(serviceListItem, dispatch) : persistNewPriceListItem(serviceListItem, dispatch);
  }

  export const getPurePriceList = (currentBusinessId) => {
    return new Promise((resolve, reject) => 
      PriceListDataService.getByServiceId(currentBusinessId).on("value", (data) => {
        let dataValue = data.val();
        if(!dataValue) {
          resolve([]);
          return;
        }
        let convertedResponse = Object.keys(dataValue).map( x=> {
          return {
              id: x, 
              ...dataValue[x]
          }
        });
        resolve(convertedResponse);
      }),
      (error) => {
        console.log("Query restaurants FAILED");
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          // TODO: Changed
          Promise.reject(message);
      }
    );
  };


  export const getPriceList = (currentBusinessId) => (dispatch) => {
    //alert('aaa');
    return getPurePriceList(currentBusinessId).then(response => {
      //alert(JSON.stringify(response));
      return dispatch({
        type: PRICE_LIST_QUERIED,
        "payload": response
      });
    })
  };

  export const getBookingList = (currentBusinessId) => (dispatch) => {
    JavaBookingsDataService.getByServiceId(currentBusinessId).then(response => {
      console.log("QUERIED" + JSON.stringify(response));
      return dispatch({
        type: BOOKINGS_QUERIED,
        "payload": response.data ? response.data : response
      });
    })
  };

  // Realtime database
  export const getBookingsById = (currentBusinessId) => {
    return new Promise((resolve, reject) => 
      BookingsDataService.getByServiceId(currentBusinessId).on("value", (data) => {
        let dataValue = data.val();
        if(!dataValue) {
          resolve([]);
          return;
        }
        let convertedResponse = Object.keys(dataValue).map( x=> {
          return {
              id: x, 
              ...dataValue[x]
          }
        });
        resolve(convertedResponse);
      }),
      (error) => {
        console.log("Query restaurants FAILED");
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          // TODO: Changed
          Promise.reject(message);
      }
    );
  };