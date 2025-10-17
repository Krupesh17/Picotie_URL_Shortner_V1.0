import {
  changeEmail,
  changePassword,
  createAccount,
  logIn,
  logOut,
  resetPassword,
  updateAccount,
} from "@/utils/api_auth";
import { deleteFile, uploadFile } from "@/utils/api_bucket";
import { createClick, getClicksByURLId } from "@/utils/api_clicks";
import { createNewShortURL, deleteURL, getLongURL } from "@/utils/api_urls";
import { useMutation } from "@tanstack/react-query";

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (data) => createAccount(data),
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: (data) => updateAccount(data),
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

export const useResetPassword = () => {
   return useMutation({
    mutationFn: (data) => resetPassword(data),
    onError: (error) => {
      throw error;
    },
  });
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (new_password) => changePassword(new_password),
    onError: (error) => {
      throw error;
    },
  });
};

export const useChangeEmail = () => {
  return useMutation({
    mutationFn: (data) => changeEmail(data),
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

export const useGetLongURL = () => {
  return useMutation({
    mutationFn: (url_slug) => getLongURL(url_slug),
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
    mutationFn: (url_id) => createClick(url_id),
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
