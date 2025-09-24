import { createAccount, logIn, logOut } from "@/utils/api_auth";
import { deleteFile, uploadFile } from "@/utils/api_bucket";
import { createClick, getClicksByURLId } from "@/utils/api_clicks";
import { createNewShortURL, deleteURL } from "@/utils/api_urls";
import { useMutation } from "@tanstack/react-query";

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (data) => createAccount(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useLogIn = () => {
  return useMutation({
    mutationFn: (data) => logIn(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: () => logOut(),
    onError: (error) => {
      throw error;
    },
  });
};

export const useCreateNewShortURL = () => {
  return useMutation({
    mutationFn: (data) => createNewShortURL(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteURL = () => {
  return useMutation({
    mutationFn: (url_id) => deleteURL(url_id),
    onError: (error) => {
      throw error;
    },
  });
};

export const useCreateClick = () => {
  return useMutation({
    mutationFn: (data) => createClick(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetClicksByUrlId = () => {
  return useMutation({
    mutationFn: (url_id) => getClicksByURLId(url_id),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (data) => uploadFile(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (data) => deleteFile(data),
    onError: (error) => {
      throw error;
    },
  });
};
