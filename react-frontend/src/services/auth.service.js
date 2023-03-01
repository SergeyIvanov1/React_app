import axios from "axios";

const API_URL = "http://localhost:8082/api/auth/";

// register(): POST {имя пользователя, электронная почта, пароль}
const register = (username, firstName, lastName, email, password) => {
  return axios.post(API_URL + "users/signup", {
    username,
    firstName,
    lastName,
    email,
    password,
  });
};

// login(): POST {имя пользователя, пароль} и сохранить JWTв локальном хранилище
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// logout(): удалить JWTиз локального хранилища
const logout = () => {
  localStorage.removeItem("user");
};

// getCurrentUser(): получить сохраненную информацию о пользователе (включая JWT)
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;