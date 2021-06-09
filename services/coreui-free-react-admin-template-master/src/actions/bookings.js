import {
  BOOKING_SAVED, 
  BOOKING_DELETED
} from "./types";

import BookingsDataService from "../services/bookings.service.java";
import {getBookingList} from "./global";

export const deleteBooking = (key) => (dispatch) => {
  return BookingsDataService.delete(key).then(function (response) {
    if(response.status === 200) {
      dispatch({
        type: BOOKING_DELETED,
        "payload": key,
      });    
    } else {
      alert('Deleting the booking failed. ')
    }
  });
};

export const nextAvailable = (request, callback) => (dispatch) => {
  return BookingsDataService.findNextAvailable(request).then(function (response) {
    if(response.status === 200) {
      callback(response.data.start, response.data.wereClashing);
    } else {
      alert('Deleting the booking failed. ')
    }
  });
};


export const newBookingPromised = (booking, callback, serviceProviderId) => (dispatch) => {
  booking.status = 'PENDING';
  return BookingsDataService.create(booking).then(function (response) {
    if(response.status === 200) {
      dispatch(getBookingList(booking.service.id));
      dispatch({
        type: BOOKING_SAVED,
        "payload": response.data ? response.data : response,
      });
      console.log("Booking saved");
      callback();
      alert("You have succesfully Booked ! ")
      return Promise.resolve();
    } else {
      alert("This period is already booked. Please choose another. ")
    }
  })
    .catch(function (error) {
      alert("This period is already booked. Please choose another. ")
      console.log("Persisting the bookings FAILED");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
  });
};


export const newBooking = (booking, callback, serviceProviderId) => (dispatch) => {
  booking.status = 'PENDING';
  return BookingsDataService.create(booking).on("value", (data) => {
    let dataValue = data.val();
    dispatch(getBookingList(serviceProviderId));

    dispatch({
      type: BOOKING_SAVED,
      "payload": dataValue,
    });
    console.log("Booking saved");
    callback();
    return Promise.resolve();
    },
    (error) => {
      console.log("Persisting the bookings FAILED");
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
