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

const post = (url, data) =>
  sendRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

export default {
  get,
  post
};
