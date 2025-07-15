
// import axios from 'axios';
// import { useAuthStore } from '../libs/zustand';

// const apiUrl = import.meta.env.VITE_API_URL;

// function getToken() {
//   const state = useAuthStore.getState();
//   return state.token || localStorage.getItem("token") || "";
// }

// async function handleResponse(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response.data;
//   } else {
//     const error = new Error(response.data || "Something went wrong");
//     error.data = response.data;
//     throw error;
//   }
// }


// async function apiCall(endpoint, method = "GET", data = null) {
//   const url = `${apiUrl}${endpoint}`;
//   const token = getToken();

//   const options = {
//     method,
//     url,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data,
//   };

//   if (data && !(data instanceof FormData)) {
//     options.headers["Content-Type"] = "application/json";
//   }

//   try {
//     const response = await axios(options);
//     return await handleResponse(response);
//   } catch (error) {
//     console.error(`Error with ${method} request to ${endpoint}:`, error);
//     throw error; 
//   }
// }

// export function getData(endpoint) {
//   return apiCall(endpoint, "GET");
// }

// export function postData(endpoint, data) {
//   return apiCall(endpoint, "POST", data);
// }

// export function patchData(endpoint, data) {
//   return apiCall(endpoint, "PATCH", data);
// }

// export function putData(endpoint, data) {
//   return apiCall(endpoint, "PUT", data);
// }

// export function deleteData(endpoint, data) {
//   return apiCall(endpoint, "DELETE", data);
// }






import axios from 'axios';
import { useAuthStore } from '../libs/zustand';

const apiUrl = import.meta.env.VITE_API_URL;

function getToken() {
  const state = useAuthStore.getState();
  return state.token || localStorage.getItem("token") || "";
}

async function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    const error = new Error(response.data || "Something went wrong");
    error.data = response.data;
    throw error;
  }
}

async function apiCall(endpoint, method = "GET", data = null) {
  const url = `${apiUrl}${endpoint}`;
  const token = getToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Only set Content-Type for JSON (FormData will automatically set its own)
  // if (data && !(data instanceof FormData)) {
  //   Authorization: `Bearer ${token}`,
  // }

  const options = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axios(options);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error with ${method} request to ${endpoint}:`, error);
    throw error;
  }
}

export function getData(endpoint) {
  return apiCall(endpoint, "GET");
}

export function postData(endpoint, data) {
  return apiCall(endpoint, "POST", data);
}

export function patchData(endpoint, data) {
  return apiCall(endpoint, "PATCH", data);
}

export function putData(endpoint, data) {
  return apiCall(endpoint, "PUT", data);
}

export function deleteData(endpoint, data) {
  return apiCall(endpoint, "DELETE", data);
}
















