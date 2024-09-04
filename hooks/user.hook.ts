import {
  GetUserProfile,
  UpdateProfile,
  changePasswordApi,
  userDashboardDataApi,
} from "@/service/user";
import { setUser } from "@/store/slice/user.slice";
import { processResponse } from "@/utils/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCommonSettings } from "./common.hook";

export const useGetUserDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user_dashboard"],
    queryFn: () => userDashboardDataApi(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};
export const useChangePassword = () => {
   const {
     register,
     handleSubmit,
     control,
     setValue,
     formState: { errors },
     watch,
   } = useForm();
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return changePasswordApi(data);
  });
  const handlePasswordChange = async (data: any) => {
    const response = await mutateAsync(data);
    processResponse(response);
  };
  return {
    handlePasswordChange,
    register,
    handleSubmit,
    control,
    setValue,
    errors,
    isLoading,
  };
};
export const useProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [siteProPicId, setsiteProPicId] = useState();

  const [uploadImageUrlForProPic, setuploadImageUrlForProPic] = useState();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const {
    data: userProfile,
    isLoading: isProfileLoading,
    refetch,
  } = useQuery({
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
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return UpdateProfile(data);
  });
  const handleProfileUpdate = async (data: any) => {
    delete data.email;
    data.country = data?.country?.value ? data?.country?.value : data?.country;
    data.gender = data?.gender?.value ? data?.gender?.value : data?.gender;
    if (siteProPicId) data.file_id = siteProPicId;
    const response = await mutateAsync(data);
    refetch();
    processResponse(response);
  };

  return {
    isLoading: isProfileLoading,
    user: userProfile?.data,
    Controller,
    control,
    setValue,
    errors,
    watch,
    register,
    handleSubmit,
    handleProfileUpdate,
    uploadImageUrlForProPic,
    setuploadImageUrlForProPic,
    siteProPicId,
    setsiteProPicId,
  };
};
