import config from "config";

const sendRequest = async (url, options = {}) => {
  const response = await fetch(`${config.api}/${url}`, options);

  return await response.json();
};

const get = (url, token) =>
  sendRequest(url, {
    method: "GET",
    headers: {
      Authorization: token
    }
  });

const post = (url, data, token = null) =>
  sendRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token })
    },
    body: JSON.stringify(data)
  });

const remove = (url, token) =>
  sendRequest(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });

export default {
  get,
  post,
  remove
};
