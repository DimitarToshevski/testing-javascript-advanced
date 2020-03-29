import config from "config";
import AuthService from "services/AuthService";

const sendRequest = async (url, options = {}) => {
  const response = await fetch(`${config.api}/${url}`, options);

  return await response.json();
};

const get = url =>
  sendRequest(url, {
    method: "GET",
    headers: {
      Authorization: AuthService.getToken()
    }
  });

const post = (url, data) => {
  const token = AuthService.getToken();

  return sendRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token })
    },
    body: JSON.stringify(data)
  });
};

const remove = url =>
  sendRequest(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: AuthService.getToken()
    }
  });

export default {
  get,
  post,
  remove
};
