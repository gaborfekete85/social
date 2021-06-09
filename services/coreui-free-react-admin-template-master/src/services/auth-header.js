export default function authHeader() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + accessToken };

    // for Node.js Express back-end
    //return { "x-access-token": user.token };
  } else {
    return {};
  }
}
