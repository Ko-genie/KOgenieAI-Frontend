import { processResponse } from "@/utils/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import {
  braintreeDropInPaymentHandlerApi,
  checkSubscriptionStatus,
  getAllPackagesDataApi,
  getModelNamesDataApi,
  getPackagesDataApi,
  getSinglePackagesDataApi,
  packageDeleteHandleApi,
  packageFormHandleApi,
  packageUpdateFormHandleApi,
} from "@/service/paymentSettings";
import { useRouter } from "next/router";
import { PACKAGE_TYPES } from "@/helpers/coreConstant";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { isSubscribed, notSubscribed } from "@/store/slice/subscription.slice";
import { useEffect, useState } from "react";
import { IRootState } from "@/store";

export const useGetPackagesData = (type: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["packagesData", currentPage],
    queryFn: () => getPackagesDataApi(type, 10, currentPage),
  });
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  return {
    data,
    isLoading,
    handlePageClick,
    setCurrentPage,
  };
};
export const useCheckSectionSubscriptionStatus = (feature: number) => {
  const [enable, setEnable] = useState(true);
  const { isSubscribed, details } = useSelector(
    (state: IRootState) => state.subcription
  );

  useEffect(() => {
    if (!isSubscribed || !details?.available_features) {
      setEnable(false);
      return;
    }
    const featureExists = details.available_features.includes(feature);
    setEnable(featureExists);
  }, [isSubscribed, details?.available_features, feature]);

  return { enable };
};

export const useGetModelData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["modelData"],
    queryFn: () => getModelNamesDataApi(),
  });

  return {
    data,
    isLoading,
  };
};

export const usePackageSettingsFormHandler = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return packageFormHandleApi(data);
  });

  const handleGeneralSettings = async (data: any) => {
    try {
      let value = {
        ...data,
        feature_description_lists: data.feature_description_lists
          .map((item: any) => item.description)
          .filter((description: any) => description.trim() !== "")
          .join(","),
        available_features: data.available_features
          .map((item: any) => item.value)
          .join(","),
        status: data.status.value,
        type: data.type.value,
        price: parseFloat(data.price),
        duration: Number(data.duration?.value),
        total_words: Number(data.total_words),
        total_images: Number(data.total_images),
        model_name: data.model_name.value,
      };
   
      const response = await mutateAsync(value);
      processResponse(response);
      if (response.success) {
        if (value.type == PACKAGE_TYPES.SUBSCRIPTION) {
          router.push(`/admin/payments/packages/subscription`);
          return;
        }
        if (value.type == PACKAGE_TYPES.PACKAGE) {
          router.push(`/admin/payments/packages/aditional-packs`);
          return;
        }
      }
    
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleGeneralSettings,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
  };
};

export const useGetSinglePackagesData = (pack_id: any) => {
 
  const { data, isLoading } = useQuery({
    queryKey: ["singlePackagesData", pack_id],
    queryFn: () => getSinglePackagesDataApi(pack_id),
    enabled: pack_id ? true : false,
  });

  return {
    data,
    isLoading,
  };
};

export const usePackages = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: packagesData, isLoading: IsGetLoading } = useGetPackagesData(
    PACKAGE_TYPES.PACKAGE
  );
  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return packageDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["packagesData"]);
      },
    }
  );
  const deleteHandler = (id: any) => {
    Swal.fire({
      title: "Do you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDeleteDataPackegs(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleDeleteDataPackegs = async (pack_id: any) => {
  
    try {
      const response = await mutateAsync(pack_id);
      processResponse(response);
    
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    handleDeleteDataPackegs,
    isLoading,
    deleteHandler,
    currentPage,
    setCurrentPage,
    packagesData,
    IsGetLoading,
  };
};

export const usePackageUpdateSettingsFormHandler = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return packageUpdateFormHandleApi(data);
  });

  const handleGeneralSettings = async (data: any) => {
   
    try {
      let value = {
        ...data,
        feature_description_lists: data.feature_description_lists
          .map((item: any) => item.description)
          .filter((description: any) => description.trim() !== "")
          .join(","),
        available_features: data.available_features
          .map((item: any) => item.value)
          .join(","),
        status: data.status.value,
        model_name: data.model_name.value,
        type: data.type.value,
        price: parseFloat(data.price),
        duration: Number(data.duration?.value),
        total_words: Number(data.total_words),
        total_images: Number(data.total_images),
      };
     
      const response = await mutateAsync(value);
      processResponse(response);
      if (response.success) {
        if (value.type == PACKAGE_TYPES.SUBSCRIPTION) {
          router.push(`/admin/payments/packages/subscription`);
          return;
        }
        if (value.type == PACKAGE_TYPES.PACKAGE) {
          router.push(`/admin/payments/packages/aditional-packs`);
          return;
        }
      }
    
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleGeneralSettings,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
  };
};

export const useGetAllPackage = (type: any) => {
  const { data, isLoading } = useQuery({
    queryKey: [`allpackdatas${type}`],
    queryFn: () => getAllPackagesDataApi(type),
  });

  return {
    data,
    isLoading,
  };
};
export const useSubscriptionStatus = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = useQuery({
    retry: 0,
    queryKey: ["check_subscription"],
    queryFn: () => checkSubscriptionStatus(),
    onSuccess: (data) => {
      if (data.success === true) {
        dispatch(isSubscribed(data.data));
      } else {
        dispatch(notSubscribed());
      }
    },
    onError: () => {
      router.push("/login");
    },
    enabled: !!Cookies.get("token"),
  });

  return {
    isLoading,
    data,
    refetch,
  };
};

export const useBraintreeDropInPaymentHandler = () => {
  const { data, refetch } = useSubscriptionStatus();
  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return braintreeDropInPaymentHandlerApi(data);
  });

  const handleBraintreeDropInPayment = async (data: any) => {
    try {
      const response = await mutateAsync(data);
      processResponse(response);
      if (response.success) {
        refetch();
      }
     
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    handleBraintreeDropInPayment,
    isLoading,
  };
};
