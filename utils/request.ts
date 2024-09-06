import axios from "axios";
import Cookie from "js-cookie";

// Create an axios instance with a base URL and default headers
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Base URL for API requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    apisecretkeycheck: process.env.NEXT_PUBLIC_API_SECRET, // Secret key
  },
});

// Interceptor for adding the Authorization token
request.interceptors.request.use((config: any) => {
  const token = Cookie.get("token"); // Get the token from cookies

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the token to Authorization header
  }
  return config;
});

// Interceptor for handling responses
request.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Add error handling logic here if needed, such as redirecting to login on 401
    return Promise.reject(error);
  }
);

// API request function
export function apiRequest(base: string, query: any = null) {
  // If query is null, perform a GET request without query parameters
  if (query === null) {
    return request.get(base); // Using axios instance for GET requests
  } else {
    // If query is provided, use the same axios instance with a POST request or pass query in GET
    return request.post(base, query);
  }
}

export default request;