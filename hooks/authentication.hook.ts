import {
  GoogleloginApi,
  ResetPasswordApi,
  forgotPasswordApi,
  loginApi,
  loginGithubApi,
  signupApi,
  verifyEmailApi,
} from "@/service/authentication";
//@ts-ignore
import Cookies from "js-cookie";

import { processResponse } from "@/utils/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { GetUserProfile } from "@/service/user";
import { setUser } from "@/store/slice/user.slice";
import { useDispatch } from "react-redux";
import { USER_ROLE_ADMIN } from "@/helpers/coreConstant";
import { useEffect } from "react";

export const useSignin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return loginApi(data.email, data.password);
  });

  const { mutateAsync: MutateGithub, isLoading: githubLoading } = useMutation(
    (data: any) => {
      return loginGithubApi(data);
    }
  );
  useEffect(() => {
    router.query.code && handleGithubLogin(String(router.query.code));
  }, [router.query.code]);
  const { mutateAsync: mutateGoogle, isLoading: gLoading } = useMutation(
    (data: any) => {
      return GoogleloginApi(data.credential, data.clientId);
    }
  );

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await mutateAsync({ email, password });
      processResponse(response);
      if (response.success) {
        Cookies.set("token", response?.data?.accessToken);
        Cookies.set("role", response?.data?.user?.role);
        if (response?.data?.user?.role === USER_ROLE_ADMIN) {
          // router.push("/admin/dashboard");
          router.push("/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      processResponse(error);
    }
  };
  const handleGoogleLogin = async (credential: string, clientId: string) => {
    try {
      const response = await mutateGoogle({ credential, clientId });
      processResponse(response);
      if (response.success) {
        router.push("/dashboard");
        Cookies.set("token", response?.data?.accessToken);
        Cookies.set("user", response?.data?.user);
      }
    } catch (error) {
      processResponse(error);
    }
  };
  const handleGithubLogin = async (code: string) => {
    try {
      const response = await MutateGithub(code);
      processResponse(response);
      if (response.success) {
        router.push("/dashboard");
        Cookies.set("token", response?.data?.accessToken);
        Cookies.set("user", response?.data?.user);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    handleLogin,
    isLoading,
    handleGoogleLogin,
    mutateGoogle,
    gLoading,
    setValue,
  };
};
export const useForgetPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return forgotPasswordApi(data.email);
  });

  const handleForgetPassword = async (email: string, password: string) => {
    try {
      const response = await mutateAsync({ email, password });
      processResponse(response);
      router.push("/reset-password");
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    handleForgetPassword,
    isLoading,
    setValue,
  };
};
export const useSignup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return signupApi(
      data.email,
      data.password,
      data.first_name,
      data.last_name,
      data.user_name
    );
  });

  const handleSignup = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    user_name: string
  ) => {
    try {
      const data = await mutateAsync({
        email,
        password,
        first_name,
        last_name,
        user_name,
      });
      processResponse(data);
      if (data.success) {
        router.push("/verify-email");
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return { register, handleSubmit, errors, handleSignup, isLoading };
};
export const useVerifyEmail = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return verifyEmailApi(data.email, data.code);
  });

  const handleVerifyCode = async (email: string, code: string) => {
    try {
      const data = await mutateAsync({ email, code });
      processResponse(data);
      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return { register, handleSubmit, errors, handleVerifyCode, isLoading };
};
export const useResetPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return ResetPasswordApi(
      data.email,
      data.password,
      data.confirmPassword,
      data.code
    );
  });

  const handleResetPassword = async (
    email: string,
    password: string,
    confirmPassword: string,
    code: string
  ) => {
    try {
      const data = await mutateAsync({
        email,
        password,
        confirmPassword,
        code,
      });
      processResponse(data);
      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return { register, handleSubmit, errors, handleResetPassword, isLoading };
};
export const useCheckAuthState = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    retry: 0,
    queryKey: ["user"],
    queryFn: () => GetUserProfile(),
    onSuccess: (data) => {
      if (data.success === true) {
        dispatch(setUser(data.data));
      }
    },
    onError: () => {
      router.push("/login");
    },
    enabled: !!Cookies.get("token"),
  });

  return {
    isLoading: isProfileLoading,
    user: userProfile?.data,
  };
};
