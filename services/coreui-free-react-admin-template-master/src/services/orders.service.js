import { database } from "../firebase";

const db = database.ref("/orders");

class OrdersDataService {
  getAll() {
    return db;
  }

  create(tutorial) {
    return db.push(tutorial);
  }

  updateStatus(issuer, key, value) {
    return db.child(issuer).child(key).update(value);
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

export default new OrdersDataService();
