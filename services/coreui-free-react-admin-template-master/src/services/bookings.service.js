//import { database, firestore } from "../firebase";
//import * as fb from "firebase";

import firebase from 'firebase'

import { database, firestore } from "../firebase";

import PriceListDataService from './pricelists';

const db = database.ref("/bookings");

class BookingsDataService {
  getAll() {
    return db;
  }

  getByServiceId(serviceId) {
    return db.orderByChild("functionality/serviceId").equalTo(serviceId);
  }

  create(booking) {
    booking.bookingTime = firebase.firestore.Timestamp.fromDate(booking.bookingTime);
    return db.push(booking);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new BookingsDataService();
