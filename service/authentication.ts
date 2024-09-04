import request from "@/utils/request";

export const loginApi = async (email: any, password: any) => {
  const { data } = await request.post("/auth/login", {
    email: email,
    password: password,
  });
  return data;
};

export const loginGithubApi = async (code: string) => {
  const { data } = await request.get(`/auth/github-login?code=${code}`);
  return data;
};
export const GoogleloginApi = async (credential: string, clientId: string) => {
  const { data } = await request.post("/auth/google-login", {
    credential: credential,
    clientId: clientId,
  });
  return data;
};
export const signupApi = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  user_name: string
) => {
  const { data } = await request.post("/auth/signup", {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    user_name: user_name,
  });
  return data;
};
export const verifyEmailApi = async (email: string, code: string) => {
  const { data } = await request.post("/auth/verify-email", {
    email: email,
    code: code,
  });
  return data;
};
export const forgotPasswordApi = async (email: string) => {
  const { data } = await request.post("/auth/forgot-password", {
    email: email,
  });
  return data;
};
export const ResetPasswordApi = async (
  email: string,
  password: string,
  confirmPassword: string,
  code: string
) => {
  const { data } = await request.post("/auth/reset-password", {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    code: code,
  });
  return data;
};
