import config from "config";
import AuthService from "services/AuthService";

const sendRequest = async (url, options = {}, useAuth = true) => {
  const response = await fetch(`${config.api}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      ...(useAuth && { Authorization: AuthService.getToken() })
    }
  });

  return await response.json();
};

const get = url => sendRequest(url, { method: "GET" });

const post = (url, data, useAuth = true) =>
  sendRequest(url, { method: "POST", body: JSON.stringify(data) }, useAuth);

const remove = url => sendRequest(url, { method: "DELETE" });

const update = (url, data) =>
  sendRequest(url, { method: "PUT", body: JSON.stringify(data) });

export default {
  get,
  post,
  remove,
  update
};
