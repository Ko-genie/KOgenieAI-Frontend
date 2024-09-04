import Cookie from "js-cookie";
import request from "@/utils/request";

export const getMyImages = async () => {
  const { data } = await request.get(`/file/my-uploaded-images`);
  return data;
};

export const uploadFile = async (file: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiSecretKey = process.env.NEXT_PUBLIC_API_SECRET;

  function getAuthorizationHeader() {
    const token = Cookie.get("token");
    if (token) {
      return `Bearer ${token}`;
    }
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);

  const headers: any = {
    apisecretkeycheck: apiSecretKey,
  };

  const authorizationHeader = getAuthorizationHeader();
  if (authorizationHeader) {
    headers["Authorization"] = authorizationHeader;
  }

  return fetch(`${apiUrl}/file/upload`, {
    method: "POST",
    body: formData,
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });
};
