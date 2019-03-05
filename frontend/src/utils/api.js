export const baseApiEndpoint = "http://localhost:3000";

const getHeaders = sessionId => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: sessionId
});

// get helper function
export const getApi = (endpoint, method, sessionId) => {
  console.log(sessionId);
  return fetch(`${baseApiEndpoint}/${endpoint}`, {
    method: method,
    headers: getHeaders(sessionId)
  });
};

// post helper function
export const postApi = (endpoint, method, sessionId, data) => {
  return fetch(`${baseApiEndpoint}/${endpoint}`, {
    method: method,
    headers: getHeaders(sessionId),
    body: JSON.stringify(data)
  });
};

// Get user attributes
export const fetchUserAttributes = sessionId => {
  return getApi("users/me/", "GET", sessionId);
};

// Get list of organisations
export const getOrganisations = sessionId => {
  return getApi("organisations", "GET", sessionId);
};

// Get list of shifts
export const getShifts = sessionId => {
  return getApi("shifts", "GET", sessionId);
};

// Request logout
export const logout = sessionId => {
  return getApi("auth/logout", "DELETE", sessionId);
};
