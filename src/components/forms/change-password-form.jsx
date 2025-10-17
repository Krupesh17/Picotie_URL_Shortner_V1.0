import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useChangePassword } from "@/tanstack-query/queries";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InputPassword } from "..";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";

const ChangePasswordForm = ({ setChangePasswordState }) => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("reset_token");

  const changePasswordToken = localStorage.getItem("changePasswordToken");

  const { user } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(/.*[A-Z].*/, "Require at least one uppercase character.")
      .matches(/.*[a-z].*/, "Require at least one lowercase character.")
      .matches(/.*\d.*/, "Require at least one numeric character.")
      .matches(
        /.*[`~<>?,./!@#$%^&*()\-_+="|'{}[\];:\\].*/,
        "Require at least one special character."
      )
      .min(8, "The password must be at least 8 characters long.")
      .required("Password is required"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const { mutateAsync: changePassword, isPending: isChangePasswordPending } =
    useChangePassword();

  const handleSubmit = async (value) => {
    try {
      if (resetToken !== changePasswordToken) {
        throw new Error("Token missing or invalid. Please retry.");
      }

      await changePassword(value?.newPassword);
      setChangePasswordState((pervState) => ({
        ...pervState,
        isSubmitted: true,
      }));
    } catch (error) {
      setChangePasswordState((pervState) => ({
        ...pervState,
        isSubmitted: true,
        isError: true,
      }));
      console.error(error?.message);
    } finally {
      localStorage.removeItem("changePasswordToken");
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          defaultValue={user?.email}
          readOnly={true}
          className="hidden"
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="mb-4"> 
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <InputPassword
                  placeholder="Password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-10 rounded-2xl w-full">
          {isChangePasswordPending ? (
            <LoaderIcon className="animate-spin size-5" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
