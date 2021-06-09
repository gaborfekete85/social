import axios from "axios";

const API_URL = process.env.REACT_APP_API_GW_ENDPOINT;
const SECURITY_PREFIX = '/security/api';

class AuthService {
  login(username, password) {
    return axios
      .post("/security/auth/login", { 
        "email": username, 
        "password": password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, email, password) {

    let URL = API_URL + SECURITY_PREFIX + "/register";
    let body = {
      firstName, 
      lastName,
      email,
      password,
    };
    
    console.log("URL: " + URL);
    console.log("Request body: " + JSON.stringify(body));
    return axios.post(URL, body);
  }
}

export default new AuthService();
