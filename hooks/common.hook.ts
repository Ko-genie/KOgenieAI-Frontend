import { commonSettings } from "@/service/commom";
import { getMyImages } from "@/service/file";
import { setSettings } from "@/store/slice/common.slice";
import { processResponse } from "@/utils/functions";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useCommonSettings = () => {
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["commonSettings"],
    queryFn: () => commonSettings(),
  });
  useEffect(() => {
    if (data?.data) {
      dispatch(setSettings(data?.data));
    }
  }, [data]);
  return {
    isLoading,
    data,
    refetch,
  };
};
