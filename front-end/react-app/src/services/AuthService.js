import config from "config";

const { storage, tokenKey } = config;

const getToken = () => storage.getItem(tokenKey);

const setToken = token => storage.setItem(tokenKey, token);

const removeToken = () => storage.removeItem(tokenKey);

export default {
  getToken,
  setToken,
  removeToken
};
