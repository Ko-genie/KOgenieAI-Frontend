import request from "@/utils/request";

export const getMyImages = async (page: number) => {
  const { data } = await request.get(
    `/user/my-image-list?limit=18&offset=${page}`
  );
  return data;
};
export const getCategoriesDataApi = async (page: number, search: any) => {
  const { data } = await request.get(
    `/admin-template/category-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const getCategoriesApi = async () => {
  const { data } = await request.get(`/admin-template/category-list`);
  return data;
};

export const addCategoriesFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin-template/add-category", value);
  return data;
};
export const generateImage = async (prompt: string, image_size = "256x256") => {
  const { data } = await request.post("/user/generate-image", {
    prompt,
    image_size,
  });
  return data;
};
// generate-image
export const updateCategoryFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin-template/update-category", value);
  return data;
};

export const getSingleCategoryApi = async (cat_id: any) => {
  const { data } = await request.get(
    `/admin-template/category-details-${cat_id}`
  );
  return data;
};

export const categoryDeleteHandleApi = async (cat_id: any) => {
  const { data } = await request.delete(
    `/admin-template/delete-category-${cat_id}`
  );
  return data;
};

export const addCustomTemplateApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-template/add-new-template",
    value
  );
  return data;
};

export const getCustomTemplateListsApi = async (page: any, search: any) => {
  const { data } = await request.get(
    `/admin-template/template-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const customTemplateDeleteHandleApi = async (temp_id: any) => {
  const { data } = await request.delete(
    `admin-template/delete-template-${temp_id}`
  );
  return data;
};

export const getSingleTemplateForGenerateApi = async (temp_id: any) => {
  const { data } = await request.get(`/user/template-details-${temp_id}`);
  return data;
};

export const getCustomTemplateListsApiForUSer = async (query: any) => {
  const { data } = await request.get(`/user/get-template-list${query}`);
  return data;
};
export const getFavTemplateListsApiForUSer = async () => {
  const { data } = await request.get(`/user/favourite-list`);
  return data;
};
export const generateContentApi = async (value: any) => {
  const { data } = await request.post("/user/generate-content", value);
  return data;
};
export const myDocumentListApi = async (
  limit: number,
  offset: number,
  search: any
) => {
  const { data } = await request.get(
    `/user/document-list?limit=${limit}&offset=${offset}&search=${search}`
  );
  return data;
};

export const docDeleteHandleApi = async (doc_id: any) => {
  const { data } = await request.delete(`/user/delete-document-${doc_id}`);
  return data;
};

export const getDocDetailsApi = async (doc_id: any) => {
  const { data } = await request.get(`/user/document-details-${doc_id}`);
  return data;
};

export const updateDocFormHandleApi = async (value: any) => {
  const { data } = await request.post("/user/update-document-user", value);
  return data;
};

export const generateCodeApi = async (value: any) => {
  const { data } = await request.post("/user/generate-code", value);
  return data;
};
export const generateSheetApi = async (value: any) => {
  const { data } = await request.post("/user/generate-csv", value);
  return data;
};

export const myCodeListApi = async (
  limit: number,
  offset: number,
  search: any
) => {
  const { data } = await request.get(
    `/user/get-generated-code-list?limit=${limit}&offset=${offset}&search=${search}`
  );
  return data;
};
export const getGeneratedCsvList = async (
  limit: number,
  offset: number,
  search: any
) => {
  const { data } = await request.get(
    `/user/get-generated-csv-list?limit=${limit}&offset=${offset}&search=${search}`
  );
  return data;
};
export const codeDocDeleteHandleApi = async (code_id: any) => {
  const { data } = await request.delete(
    `/user/delete-generated-code-${code_id}`
  );
  return data;
};
export const CsvDeleteHandleApi = async (csv_id: any) => {
  const { data } = await request.delete(
    `/user/delete-generated-csv-${csv_id}`
  );
  return data;
};
// 
export const getCodeDetailsApi = async (code_id: any) => {
  const { data } = await request.get(
    `/user/get-generated-code-details-${code_id}`
  );
  return data;
};
export const getCsvDetailsApi = async (code_id: any) => {
  const { data } = await request.get(
    `/user/get-generated-csv-details-${code_id}`
  );
  return data;
};

export const getCategoryListsApiForUSerApi = async () => {
  const { data } = await request.get(`/user/category-list`);
  return data;
};
// make-template-favourite
export const makeFavouriteApi = async (template_id: number) => {
  const { data } = await request.post(`/user/make-template-favourite`, {
    template_id,
  });
  return data;
};

// for programing language

export const getProgramingLanguageListsApiForUSerApi = async () => {
  const { data } = await request.get(
    `/user/get-all-active-programing-language`
  );
  return data;
};

export const aiTranslationApi = async (value: any) => {
  const { data } = await request.post("/user/text-translate", value);
  return data;
};

export const getAiTranslateListApi = async (
  limit: number,
  offset: number,
  search: any
) => {
  const { data } = await request.get(
    `/user/get-generated-translation-list?limit=${limit}&offset=${offset}&search=${search}`
  );
  return data;
};

export const aiTranslateDeleteHandleApi = async (code_id: any) => {
  const { data } = await request.delete(
    `/user/delete-generated-translation-${code_id}`
  );
  return data;
};

export const getAiTranslateDetailsApi = async (doc_id: any) => {
  const { data } = await request.get(
    `/user/get-generated-translation-details-${doc_id}`
  );
  return data;
};

export const getActiveCategoriesApi = async () => {
  const { data } = await request.get(
    `/admin-template/get-all-active-category-list`
  );
  return data;
};

export const getTemplateDetailsApi = async (tem_id: any) => {
  const { data } = await request.get(
    `/admin-template/template-details-${tem_id}`
  );
  return data;
};

export const updateCustomTemplateApi = async (value: any) => {
  const { data } = await request.post("/admin-template/update-template", value);
  return data;
};

export const aiSpeachToTextApi = async (value: any) => {
  const { data } = await request.post("/user/generate-transcription", value, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getAiSpeachToTextApi = async (page: any, search: any) => {
  const { data } = await request.get(
    `/user/transcription-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const aiSpeachToTextDeleteHandleApi = async (id: any) => {
  const { data } = await request.delete(`/user/delete-transcription-${id}`);
  return data;
};

export const getAiSpeachToTextDetailsApi = async (doc_id: any) => {
  const { data } = await request.get(`/user/transcription-details-${doc_id}`);
  return data;
};
