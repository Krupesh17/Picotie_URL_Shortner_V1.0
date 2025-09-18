import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { InputPassword } from "..";
import { Button } from "../ui/button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogIn } from "@/tanstack-query/queries";
import { useNavigate } from "react-router-dom";
import { AlertCircleIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";

const LogInForm = ({ setRegisterFormActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { navigateToAfterAuthFormSubmitted } = useSelector((state) => state.ui);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "The password must be at least 8 characters long.")
      .required("Password is required"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: logIn, isPending: isLogInPending } = useLogIn();

  const handleSubmit = async (value) => {
    try {
      const user = await logIn({
        email: value?.email,
        password: value?.password,
      });

      if (user) {
        dispatch(
          setAuthFormsDialogActive({
            isAuthDialogActive: false,
          })
        );
        navigate(navigateToAfterAuthFormSubmitted, { replace: true });
      }
    } catch (error) {
      toast("Account Not Found", {
        className: "!gap-5",
        position: "top-center",
        icon: <AlertCircleIcon className="text-red-500" />,
        description: (
          <span className="font-medium text-copy-light">
            We couldn't find an account with that email. Please check and try
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="h-10 text-base shadow-none rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Password</FormLabel>
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

        <div className="flex items-center justify-end">
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-copy mb-4"
          >
            Forgot Password?
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full h-10 shadow-none rounded-xl mb-4"
        >
          {isLogInPending ? (
            <LoaderIcon className="animate-spin size-5" />
          ) : (
            "Login"
          )}
        </Button>

        <div className="flex items-center justify-center gap-1 text-sm">
          <p className="text-copy-light">Don't have an account?</p>
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-copy"
            onClick={() => setRegisterFormActive(true)}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LogInForm;
