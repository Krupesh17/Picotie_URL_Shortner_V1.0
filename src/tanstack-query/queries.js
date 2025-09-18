import { createAccount, logIn, logOut } from "@/utils/api_auth";
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
