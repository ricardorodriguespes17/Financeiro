import { LOGIN, LOGOUT } from "./types";

function login(user) {
  return {
    type: LOGIN,
    payload: user,
  };
}

function logout() {
  return {
    type: LOGOUT,
  };
}

export default {
  login,
  logout,
};
