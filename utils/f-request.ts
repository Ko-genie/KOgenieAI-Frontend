import Cookie from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiSecretKey = process.env.NEXT_PUBLIC_API_SECRET;

function getAuthorizationHeader() {
  const token = Cookie.get("token");
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
}

function fetchWithAuthorization(url: any, options: any) {
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    apisecretkeycheck: apiSecretKey,
  };

  const authorizationHeader = getAuthorizationHeader();
  if (authorizationHeader) {
    headers.Authorization = authorizationHeader;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

export function apiRequest(base: string, query = null) {
  const url = query === null ? `${apiUrl}${base}` : `${apiUrl}${base}${query}`;

  return fetchWithAuthorization(url, {
    method: query === null ? "GET" : "POST",
    body: query === null ? undefined : JSON.stringify(query), // Add this line
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}
