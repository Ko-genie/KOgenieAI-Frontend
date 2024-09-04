import {
  addCategoriesFormHandleApi,
  addCustomTemplateApi,
  categoryDeleteHandleApi,
  customTemplateDeleteHandleApi,
  generateImage,
  generateContentApi,
  getCategoriesApi,
  getCategoriesDataApi,
  getCustomTemplateListsApi,
  getCustomTemplateListsApiForUSer,
  getMyImages,
  getSingleCategoryApi,
  getSingleTemplateForGenerateApi,
  updateCategoryFormHandleApi,
  myDocumentListApi,
  docDeleteHandleApi,
  getDocDetailsApi,
  updateDocFormHandleApi,
  generateCodeApi,
  myCodeListApi,
  getCodeDetailsApi,
  codeDocDeleteHandleApi,
  getCategoryListsApiForUSerApi,
  makeFavouriteApi,
  getFavTemplateListsApiForUSer,
  getProgramingLanguageListsApiForUSerApi,
  aiTranslationApi,
  getAiTranslateListApi,
  aiTranslateDeleteHandleApi,
  getAiTranslateDetailsApi,
  getActiveCategoriesApi,
  getTemplateDetailsApi,
  updateCustomTemplateApi,
  aiSpeachToTextApi,
  getAiSpeachToTextApi,
  aiSpeachToTextDeleteHandleApi,
  getAiSpeachToTextDetailsApi,
  generateSheetApi,
  getGeneratedCsvList,
  CsvDeleteHandleApi,
  getCsvDetailsApi,
  next,
} from "@/service/templateSettings";

import { errorToast, processResponse } from "@/utils/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useSubscriptionStatus } from "./paymentSettings.hook";

export const useGetCategoriesData = (page: number) => {
  const [search, setSearch] = useState<any>("");
  const { data, isLoading } = useQuery({
    queryKey: ["categoriesData", page, search],
    queryFn: () => getCategoriesDataApi(page, search),
  });

  return {
    data,
    isLoading,
    setSearch,
    search,
  };
};
...
import { errorToast, processResponse } from "@/utils/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useSubscriptionStatus } from "./paymentSettings.hook";

export const useGetCategoriesData = (page: number) => {
  const [search, setSearch] = useState<any>("");
  const { data, isLoading } = useQuery({
    queryKey: ["categoriesData", page, search],
    queryFn: () => getCategoriesDataApi(page, search),
  });

  return {
    data,
    isLoading,
    setSearch,
    search,
  };
};
export const useMyImages = (page: number) => {
  const { refetch: refetchBalance } = useSubscriptionStatus();

  const [prompt, setPrompt] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState("256x256");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getMyImages", page],
    queryFn: () => getMyImages(page),
  });
  const { mutateAsync, isLoading: isPostLoading } = useMutation((data: any) => {
    return generateImage(data, imageSize);
  });
  const handleImageClick = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImageUrl(null);
  };
  const handleSubmit = async () => {
    try {
      if (prompt) {
        const response = await mutateAsync(prompt);
        await refetch();
        processResponse(response);
        await refetchBalance();
        await setPrompt("");
      } else {
        errorToast("Please enter a prompt");
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    data,
    isLoading,
    prompt,
    setPrompt,
    handleSubmit,
    isPostLoading,
    handleImageClick,
    modalImageUrl,
    handleCloseModal,
    setModalImageUrl,
    setImageSize,
    imageSize,
  };
};

export const useGetCategoriesForOption = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  return {
    data,
    isLoading,
  };
};

export const useAddCategoriesFormHandler = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return addCategoriesFormHandleApi(data);
  });

  const handleAddCategoriesSettings = async (data: any) => {
    try {
      let value = {
        ...data,
        status: Number(data.status?.value),
      };
      const response = await mutateAsync(value);
      processResponse(response);

      if (response.success) {
        router.push(`/admin/templates/ai-writer-categories`);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleAddCategoriesSettings,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
  };
};

export const useGetSingleCategoryData = (cat_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["singleCategoryData", cat_id],
    queryFn: () => getCatDetails(cat_id),
    enabled: cat_id ? true : false,
  });

  const getCatDetails = async (cat_id: any) => {
    if (!cat_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getSingleCategoryApi(cat_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};

export const useUpdateCategoriesFormHandler = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return updateCategoryFormHandleApi(data);
  });

  const handleUpdateCategorySettings = async (data: any) => {
    try {
      let value = {
        ...data,
        status: Number(data.status?.value),
      };
      const response = await mutateAsync(value);
      processResponse(response);

      if (response.success) {
        router.push(`/admin/templates/ai-writer-categories`);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleUpdateCategorySettings,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
  };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return categoryDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categoriesData"]);
      },
    }
  );

  const handleDeleteCategory = async (pack_id: any) => {
    try {
      const response = await mutateAsync(pack_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    handleDeleteCategory,
    isLoading,
  };
};

export const useCustomTemplateFormHandler = () => {
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
    return addCustomTemplateApi(data);
  });

  const handleInputGroups = (items: any) => {
    let data = items.filter((item: any) => item);

    data = data.map((item: any) => {
      if (item.name) {
        const value = {
          name: item.name,
          input_field_name: item.input_field_name,
          description: item.description,
          type: Number(item.type?.value),
        };
        return value;
      }
    });

    return data;
  };

  const handleCustomTemplateSettings = async (data: any) => {
    try {
      let value = {
        ...data,
        category_id: Number(data.category_id?.value),
        package_type: Number(data.package_type?.value),
        status: Number(data.status?.value),
        input_groups: handleInputGroups(data.input_groups),
      };

      const response = await mutateAsync(value);
      processResponse(response);
      if (response.success) {
        router.push(`/admin/templates/custom-templates`);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleCustomTemplateSettings,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
  };
};

export const useGetCustomTemplateLists = (page: any) => {
  const [search, setSearch] = useState<any>("");
  const { data, isLoading } = useQuery({
    queryKey: ["customTemplateLists", page, search],
    queryFn: () => getCustomTemplateListsApi(page, search),
  });

  return {
    data,
    isLoading,
    setSearch,
    search,
  };
};

export const useDeleteCustomTemplate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return customTemplateDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customTemplateLists"]);
      },
    }
  );

  const customTemplateDeleteHandler = async (temp_id: any) => {
    try {
      const response = await mutateAsync(temp_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    customTemplateDeleteHandler,
    isLoading,
  };
};

export const useGetSingleTemplateForGenerate = (temp_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["singleTemplateForGenerate", temp_id],
    queryFn: () => getTemplateDetails(temp_id),
    enabled: temp_id ? true : false,
  });

  const getTemplateDetails = async (temp_id: any) => {
    if (!temp_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getSingleTemplateForGenerateApi(temp_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};

export const useGetCustomTemplateListsForUser = (category_id: any) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["customTemplateListsForUsers", category_id],
    queryFn: () => categoryHandlerForUser(category_id),
  });
  const { mutateAsync, isLoading: IsFavLoading } = useMutation(
    (data: any) => {
      return makeFavouriteApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customTemplateListsForUsers"]);
      },
    }
  );
  const handleFavSubmit = async (id: number) => {
    const response = await mutateAsync(Number(id));

    processResponse(response);
  };
  const categoryHandlerForUser = async (category_id: any) => {
    let queryStr = "";
    if (category_id !== "all") {
      queryStr = `?category_id=${category_id}`;
    }
    const data = await getCustomTemplateListsApiForUSer(queryStr);
    return data;
  };

  return {
    data,
    isLoading,
    handleFavSubmit,
  };
};
export const useGetFavTemplateListsForUser = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["customTemplateListsForUsers"],
    queryFn: () => favTempHandlr(),
  });
  const { mutateAsync, isLoading: IsFavLoading } = useMutation(
    (data: any) => {
      return makeFavouriteApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customTemplateListsForUsers"]);
      },
    }
  );
  const handleFavSubmit = async (id: number) => {
    const response = await mutateAsync(Number(id));

    processResponse(response);
  };
  const favTempHandlr = async () => {
    const data = await getFavTemplateListsApiForUSer();
    return data;
  };

  return {
    data,
    isLoading,
    handleFavSubmit,
  };
};
export const useMyDocuments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");

  const { data, isLoading } = useQuery({
    queryKey: ["myDocuments", search, currentPage],
    queryFn: () => myDocumentListApi(10, currentPage, search),
  });
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  return {
    data: data?.data,
    isLoading,
    handlePageClick,
    setCurrentPage,
    setSearch,
    search,
  };
};
// myDocumentListApi
export const useAiWriterGeneratorForUser = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { mutateAsync, isLoading, data } = useMutation((data: any) => {
    return generateContentApi(data);
  });

  const handleAiWriterGeneratorForUser = async (data: any) => {
    console.log(data);
    try {
      let value = {
        ...data,
        template_id: Number(data.template_id),
        creativity: parseFloat(data.creativity?.value),
        tone_of_voice: data.tone_of_voice?.value,
        language: data.l_a_n_g_u_a_g_e?.value,
        maximum_length: Number(data.maximum_length),
        number_of_result: Number(data.number_of_result),
      };
      const response = await mutateAsync(value);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleAiWriterGeneratorForUser,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
    data,
  };
};

export const useDeleteDoc = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return docDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myDocuments"]);
      },
    }
  );

  const docDeleteHandler = async (temp_id: any) => {
    try {
      const response = await mutateAsync(temp_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    docDeleteHandler,
    isLoading,
  };
};

export const useGetDocDetails = (doc_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["docDetails", doc_id],
    queryFn: () => getDocDetails(doc_id),
    enabled: doc_id ? true : false,
  });

  const getDocDetails = async (doc_id: any) => {
    if (!doc_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getDocDetailsApi(doc_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};

export const useUpdateDocFormHandler = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return updateDocFormHandleApi(data);
  });

  const handleUpdateDoc = async (data: any) => {
    try {
      const response = await mutateAsync(data);
      processResponse(response);

      if (response.success) {
        router.push(`/document`);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleUpdateDoc,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
  };
};

// for ai code generator

export const useSpreadsheetAi = () => {
  const [result, setResult] = useState();
  const { refetch: refetchBalance } = useSubscriptionStatus();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading, data } = useMutation((data: any) => {
    return generateSheetApi(data);
  });

  const handleAiSheetToUser = async (data: any) => {
    try {
      const response = await mutateAsync(data);
      await refetchBalance();
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };
  useEffect(() => {
    console.log(data?.data, "data?.data");
    data?.data && setResult(JSON.parse(data?.data));
  }, [data]);

  return {
    register,
    handleSubmit,
    handleAiSheetToUser,
    Controller,
    control,
    result,
    isLoading,
    // data,
  };
};

export const useAiCodeGeneratorForUser = () => {
  const { refetch: refetchBalance } = useSubscriptionStatus();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { mutateAsync, isLoading, data } = useMutation((data: any) => {
    return generateCodeApi(data);
  });

  const handleAiCodeGeneratorForUser = async (data: any) => {
    try {
      let value = {
        ...data,
        coding_level: data.coding_level?.value,
        coding_language: data.coding_language?.value,
      };
      const response = await mutateAsync(value);
      await refetchBalance();
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleAiCodeGeneratorForUser,
    Controller,
    control,
    isLoading,
    data,
  };
};
// getGeneratedCsvList;
export const useMyCsv = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");
  const { data, isLoading } = useQuery({
    queryKey: ["myCsv", search, currentPage],
    queryFn: () => getGeneratedCsvList(10, currentPage, search),
  });
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading: IsDeleting } = useMutation(
    (data: any) => {
      return CsvDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myCsv"]);
      },
    }
  );

  const csvDocDeleteHandler = async (csv_id: any) => {
    try {
      const response = await mutateAsync(csv_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    data: data?.data,
    isLoading,
    handlePageClick,
    setCurrentPage,
    setSearch,
    search,
    csvDocDeleteHandler,
    IsDeleting,
  };
};
export const useMyCodes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");
  const { data, isLoading } = useQuery({
    queryKey: ["myCodes", search, currentPage],
    queryFn: () => myCodeListApi(10, currentPage, search),
  });
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  return {
    data: data?.data,
    isLoading,
    handlePageClick,
    setCurrentPage,
    setSearch,
    search,
  };
};

export const useDeleteCodeDoc = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return codeDocDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myCodes"]);
      },
    }
  );

  const codeDocDeleteHandler = async (temp_id: any) => {
    try {
      const response = await mutateAsync(temp_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    codeDocDeleteHandler,
    isLoading,
  };
};
// getCsvDetailsApi;
export const useGetCsvDetails = (csv_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["codeDetails", csv_id],
    queryFn: () => getDocDetails(csv_id),
    enabled: csv_id ? true : false,
  });

  const getDocDetails = async (csv_id: any) => {
    if (!csv_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getCsvDetailsApi(csv_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};
export const useGetCodeDetails = (code_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["codeDetails", code_id],
    queryFn: () => getDocDetails(code_id),
    enabled: code_id ? true : false,
  });

  const getDocDetails = async (code_id: any) => {
    if (!code_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getCodeDetailsApi(code_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};

export const useGetCategoryListsForUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categoryListsForUser"],
    queryFn: () => getCategoryListsApiForUSerApi(),
  });

  return {
    data,
    isLoading,
  };
};

// for programing language

export const useGetProgramingLanguageListsForUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["programingLanguageListForUser"],
    queryFn: () => getProgramingLanguageListsApiForUSerApi(),
  });

  return {
    data,
    isLoading,
  };
};

export const useAiTranslationForUser = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { mutateAsync, isLoading, data } = useMutation((data: any) => {
    return aiTranslationApi(data);
  });

  const handleAiTranslationForUser = async (data: any) => {
    try {
      let value = {
        ...data,
        language: data.language.value,
      };
      const response = await mutateAsync(value);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleAiTranslationForUser,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
    data,
  };
};

export const useGetAiTranslateLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");

  const { data, isLoading } = useQuery({
    queryKey: ["aiTranslateLists", search, currentPage],
    queryFn: () => getAiTranslateListApi(10, currentPage, search),
  });
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  return {
    data: data?.data,
    isLoading,
    handlePageClick,
    setCurrentPage,
    search,
    setSearch,
  };
};

export const useDeleteAiTranslate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return aiTranslateDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["aiTranslateLists"]);
      },
    }
  );

  const aiTranslateListsDeleteHandler = async (temp_id: any) => {
    try {
      const response = await mutateAsync(temp_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    aiTranslateListsDeleteHandler,
    isLoading,
  };
};

export const useGetAiTranslateDetails = (doc_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["aiTranslateDetails", doc_id],
    queryFn: () => getAiTranslateDetails(doc_id),
    enabled: doc_id ? true : false,
  });

  const getAiTranslateDetails = async (doc_id: any) => {
    if (!doc_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getAiTranslateDetailsApi(doc_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};

export const useGetActiveCategoriesForOption = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["activeCategories"],
    queryFn: () => getActiveCategoriesApi(),
  });

  return {
    data,
    isLoading,
  };
};

export const useGetTemplateDetails = (tem_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["templateDetails", tem_id],
    queryFn: () => getTempDetails(tem_id),
    enabled: tem_id ? true : false,
  });

  const getTempDetails = async (tem_id: any) => {
    if (!tem_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getTemplateDetailsApi(tem_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};

export const useUpdateCustomTemplateFormHandler = () => {
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
    return updateCustomTemplateApi(data);
  });

  const handleInputGroups = (items: any) => {
    let data = items.filter((item: any) => item);

    data = data.map((item: any) => {
      if (item.name) {
        const value = {
          name: item.name,
          input_field_name: item.input_field_name,
          description: item.description,
          type: Number(item.type?.value),
        };
        return value;
      }
    });

    return data;
  };

  const handleCustomTemplateSettings = async (data: any) => {
    try {
      let value = {
        ...data,
        category_id: Number(data.category_id?.value),
        package_type: Number(data.package_type?.value),
        status: Number(data.status?.value),
        input_groups: handleInputGroups(data.input_groups),
      };

      const response = await mutateAsync(value);
      processResponse(response);
      if (response.success) {
        router.push(`/admin/templates/custom-templates`);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleCustomTemplateSettings,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
  };
};

export const useGetAiSpeachToTextForUser = () => {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [search, setSearch] = useState<any>("");
  const { data, isLoading } = useQuery({
    queryKey: ["aiSpeachToText", currentPage, search],
    queryFn: () => getAiSpeachToTextApi(currentPage, search),
  });
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };
  return {
    data,
    isLoading,
    handlePageClick,
    setCurrentPage,
    setSearch,
    search,
  };
};

export const useAiSpeachToTextForUser = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { mutateAsync, isLoading, data } = useMutation((data: any) => {
    return aiSpeachToTextApi(data);
  });

  const handleAiSpeachToTextForUser = async (data: any) => {
    console.log("data", data?.audio);
    const formData = new FormData();
    formData.append("audio", data?.audio);
    try {
      const response = await mutateAsync(data);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleAiSpeachToTextForUser,
    Controller,
    control,
    isLoading,
    setValue,
    errors,
    watch,
    data,
  };
};

export const useDeleteAiSpeachToText = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return aiSpeachToTextDeleteHandleApi(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["aiSpeachToText"]);
      },
    }
  );

  const aiSpeachToTextDeleteHandler = async (temp_id: any) => {
    try {
      const response = await mutateAsync(temp_id);
      processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };

  return {
    aiSpeachToTextDeleteHandler,
    isLoading,
  };
};

export const useGetAiSpeachToTextDetails = (doc_id: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["aiSpeachToTextDetails", doc_id],
    queryFn: () => getAiSpeachToTextDetails(doc_id),
    enabled: doc_id ? true : false,
  });

  const getAiSpeachToTextDetails = async (doc_id: any) => {
    if (!doc_id) {
      toast.error("Id Not Found");
      return;
    }
    const data = await getAiSpeachToTextDetailsApi(doc_id);

    return data;
  };

  return {
    data,
    isLoading,
  };
};
