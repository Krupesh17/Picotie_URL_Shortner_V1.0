import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useResetPassword } from "@/tanstack-query/queries";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";
import { AlertCircleIcon, CheckCircle2Icon, LoaderIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";
import { useDispatch } from "react-redux";

const ResetPasswordForm = ({ setAuthDialogState }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useResetPassword();

  const handleSubmit = async (value) => {
    try {
      const changePasswordToken = uuidV4();

      await resetPassword({ email: value?.email, changePasswordToken });

      localStorage.setItem("changePasswordToken", changePasswordToken);

      toast("Password Reset Email Sent", {
        className: "!gap-5",
        position: "top-center",
        icon: <CheckCircle2Icon className="text-green-500" />,
        description: (
          <span className="font-medium text-copy-light">
            Please check your inbox for password reset instructions.
          </span>
        ),
      });

      dispatch(
        setAuthFormsDialogActive({
          isAuthDialogActive: false,
        })
      );
    } catch (error) {
      toast("Oops! Password Reset Failed", {
        className: "!gap-5",
        position: "top-center",
        icon: <AlertCircleIcon className="text-red-500" />,
        description: (
          <span className="font-medium text-copy-light">
            We ran into an error while resetting your password. Please try
            again.
          </span>
        ),
      });

      console.error(error?.message);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="h-10 text-base shadow-none rounded-xl !bg-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-10 shadow-none rounded-xl">
          {isResetPasswordPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      <div className="flex items-center justify-center text-sm">
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-copy"
          onClick={() => setAuthDialogState("login")}
        >
          Back to Login
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
