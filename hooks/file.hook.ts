import { uploadFile, getMyImages } from "@/service/file";
import { processResponse } from "@/utils/functions";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFile = (setopen: any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const [imageGallery, setImageGallery] = useState<File[]>([]);
  const { mutateAsync, isLoading } = useMutation(
    (data: any) => {
      return uploadFile(data);
    },
    {
      onSuccess: () => {
        setSelectedImage(null);
        queryClient.invalidateQueries(["myimages"]);
      },
      onError: (err) => {
        console.log(JSON.stringify(err));

      },
    }
  );
  const {
    data,
    isLoading: imagesLoading,
    refetch,
  } = useQuery({
    queryKey: ["myimages"],
    queryFn: () => getMyImages(),
  });
  
  useEffect(() => {
    setImageGallery(data?.data);
   
  }, [data?.data]);
  const handleUpload = async () => {
    try {
      const response = await mutateAsync(selectedImage);
      
      await refetch();
      await processResponse(response);
    } catch (error) {
      processResponse(error);
    }
  };
  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const newImage = event.target.files[0];
      setSelectedImage(newImage);
    }
  };

  const handleImagePickerClick = () => {
    setopen(true);
  };

  return {
    isLoading,
    handleUpload,
    selectedImage,
    setSelectedImage,
    imageGallery,
    setImageGallery,
    handleImageInputChange,
    handleImagePickerClick,
  };
};
