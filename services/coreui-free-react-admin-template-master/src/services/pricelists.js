import { database, firestore } from "../firebase";

const db = database.ref("/pricelists");

class PriceListDataService {
  getAll() {
    return db;
  }

  getByServiceId(serviceId) {
    return db.orderByChild("serviceId").equalTo(serviceId);
  }

  create(item) {
    return db.push(item);
  }

  update(key, value) {
    delete value['id'];
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new PriceListDataService();
