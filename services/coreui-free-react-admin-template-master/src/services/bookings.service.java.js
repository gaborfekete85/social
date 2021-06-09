//import { database, firestore } from "../firebase";
//import * as fb from "firebase";
import axios from "axios";
import authHeader from "./auth-header";

import firebase from 'firebase'

import { database, firestore } from "../firebase";
import { URL_BOOKING_SERVICE } from '../constants';

import PriceListDataService from './pricelists';
import { deleteBooking } from "actions/bookings";

const db = database.ref("/bookings");

class BookingsDataService {
  getAll() {
    return db;
  }

  getByServiceId(serviceId) {
    let body = {
        "id": serviceId    
    }
    return axios.post(URL_BOOKING_SERVICE + "/findByGroup", body, { headers: authHeader() });
  }
    
  addMinutes(dt, minutes) {
      return new Date(dt.getTime() + minutes*60000);
  }

  create(booking) {
    // Todo: EPOCH 
    //booking.bookingTime = firebase.firestore.Timestamp.fromDate(booking.bookingTime);
    //alert(JSON.stringify(booking));
    //console.log("BBBB: " + JSON.stringify(booking));
    //let body = {
    //  "functionalityId": booking.functionality.id,
    //  "bookingGroupId": booking.functionality.serviceId,
    //  "start": booking.bookingTime,
    //  "end": this.addMinutes(booking.bookingTime, booking.functionality.length),
    //  "length": booking.functionality.length,
    //  "price": booking.functionality.price,
    //  "symbol": booking.functionality.symbol,
    //  "name": booking.functionality.name,
    //  "status": "CONFIRMED",
    //  "userIdentifier": booking.user.userId,
    //  "userEmail": booking.user.email,
    //  "userName": booking.user.name,
    //  "address": booking.service.id,
    //  "phone": booking.service.phone,
    //  "email": booking.service.email,
    //  "web": booking.service.web,
    //  "furtherContact": "optional"
    //}
    //alert('Start the request with ' + JSON.stringify(body));
    console.log(JSON.stringify(booking));
    return axios.post(URL_BOOKING_SERVICE, booking, { headers: authHeader() });

    //.then(function (response) {
    //  alert('Request done: ' + JSON.stringify(response));
    //  console.log(response);
    //})
    //.catch(function (error) {
    //  alert('Request failed' + error);
    //  console.log(error);
    //});;

    //console.log("REQUEST " + JSON.stringify(body, undefined,));
    //return;
    //console.log()
    //return db.push(booking);
  }

  findNextAvailable(request) {
    alert(URL_BOOKING_SERVICE);
    return axios.post(URL_BOOKING_SERVICE + "/nextAvailable", request, { headers: authHeader() });
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return axios.delete(URL_BOOKING_SERVICE, {
      headers: authHeader(),
      data: { id: key }
    });
    // Firebase return db.child(key).remove();
  }

  deleteAll() {
    //return db.remove();
  }
}

export default new BookingsDataService();
