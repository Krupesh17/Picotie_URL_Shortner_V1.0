import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputPassword } from "..";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateAccount } from "@/tanstack-query/queries";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = ({ setRegisterFormActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { navigateToAfterAuthFormSubmitted } = useSelector((state) => state.ui);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Please provide a Name that is at least 2 character long.")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
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
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createAccount, isPending: creatingAccount } =
    useCreateAccount();

  const handleSubmit = async (value) => {
    try {
      const user = await createAccount({
        name: value?.name,
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
      toast("Registration Failed", {
        className: "!gap-5",
        position: "top-center",
        icon: <AlertCircleIcon className="text-red-500" />,
        description: (
          <span className="font-medium text-copy-light">
            Something went wrong while creating your account. Please try again.
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
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="h-10 text-base shadow-none rounded-xl !bg-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  className="h-10 text-base shadow-none rounded-xl !bg-transparent"
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

        <Button
          type="submit"
          className="w-full h-10 shadow-none rounded-xl mb-4"
        >
          {creatingAccount ? (
            <LoaderIcon className="animate-spin size-5" />
          ) : (
            "Register"
          )}
        </Button>

        <div className="flex items-center justify-center gap-1 text-sm">
          <p className="text-copy-light">Already have an account?</p>
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-copy"
            onClick={() => setRegisterFormActive(false)}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
