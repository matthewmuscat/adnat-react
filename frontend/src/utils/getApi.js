// get helper function
export const getApi = (endpoint, method, sessionId) => {
  return fetch("http://localhost:3000/" + endpoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: sessionId
    }
  });
};
