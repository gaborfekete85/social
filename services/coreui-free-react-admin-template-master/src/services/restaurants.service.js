import { database, firestore } from "../firebase";
//const db = database.ref("/services");

class RestaurantsDataService {
  db = null;

  constructor(props) {
    this.db = database.ref("/services");
    //this.setState({ services: services.getAll() });
    //alert(JSON.stringify(services.getAll()));
  }

  getAll() {
    return this.db;
  }

  getMyServices(email) {
    console.log('Fetxhing for ' + email);
    let result = this.db.orderByChild("owner").equalTo(email)
    console.log('Resilt ' + JSON.stringify(result));
    return result;
  }

  getServicesByFunctionality(functionality) {
    //console.log('Fetxhing for ' + functionality);
    //let services = firestore.collection('services');
    ////return services;
    ////.whereField("vitamins", arrayContains: "B6")
    //let result = db.orderByChild("owner").equalTo('gabor.fekete85@gmail.com')
    //console.log('Resilt ' + JSON.stringify(result));
    return this.db;

  }

  create(restaurant) {
    return this.db.push(restaurant);
  }

  update(key, value) {
    return this.db.child(key).update(value);
  }

  delete(key) {
    return this.db.child(key).remove();
  }

  deleteAll() {
    return this.db.remove();
  }
}

export default new RestaurantsDataService();
