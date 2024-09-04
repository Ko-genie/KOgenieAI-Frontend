import request from "@/utils/request";

export const GetUserProfile = async () => {
  const { data } = await request.get("/user/profile");
  return data;
};
export const UpdateProfile = async (payload: any) => {
  const { data } = await request.post("/user/update-profile", payload);
  return data;
};
export const userDashboardDataApi = async () => {
  const { data } = await request.get("/user/dashboard");
  return data;
};

export const changePasswordApi = async (payload: any) => {
  const { data } = await request.post("/user/change-password", payload);
  return data;
};
