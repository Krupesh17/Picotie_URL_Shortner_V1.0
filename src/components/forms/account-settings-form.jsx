import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { ProfilePictureEditor } from "..";
import { AlertCircleIcon, CheckCircle2Icon, Loader } from "lucide-react";
import { v4 as uuidV4 } from "uuid";
import {
  useChangeEmail,
  useResetPassword,
  useUpdateAccount,
} from "@/tanstack-query/queries";
import { toast } from "sonner";

const AccountSettingsForm = ({ handleOnDialogDrawerOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Please provide a Name that is at least 2 character long.")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: user ? user?.user_metadata?.name : "",
      email: user ? user?.user_metadata?.email : "",
    },
  });

  const { mutateAsync: updateAccount } = useUpdateAccount();
  const { mutateAsync: changeEmail } = useChangeEmail();

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      localStorage.removeItem("changeEmailToken");

      if (user?.user_metadata?.name !== value?.name) {
        await updateAccount({ data: { name: value?.name } });
      }

      if (user?.user_metadata?.email !== value?.email) {
        const changeEmailToken = uuidV4();

        const response = await changeEmail({
          newEmail: value?.email,
          changeEmailToken,
        });

        localStorage.setItem("changeEmailToken", changeEmailToken);

        if (!response) {
          throw new Error("Email address change unsuccessful.");
        }

        toast("Email Change Request Sent", {
          className: "!gap-5",
          position: "top-center",
          icon: <CheckCircle2Icon className="text-green-500" />,
          description: (
            <span className="font-medium text-copy-light">
              Please check your NEW email address to confirm the change.
            </span>
          ),
        });
      }
    } catch (error) {
      toast("Oops! We Couldn't Save Your Account Changes", {
        className: "!gap-5",
        position: "top-center",
        icon: <AlertCircleIcon className="text-red-500" />,
        description: (
          <span className="font-medium text-copy-light">
            We ran into an error while updating your account. Please check your
            information and try again.
          </span>
        ),
      });
      console.error(error?.message);
    } finally {
      setLoading(false);
      handleOnDialogDrawerOpen();
    }
  };

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useResetPassword();

  const handleCreatePassword = async () => {
    try {
      const changePasswordToken = uuidV4();

      await resetPassword({
        email: user?.user_metadata?.email,
        changePasswordToken,
      });

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
    }
  };

  return (
    <>
      <ProfilePictureEditor
        handleOnDialogDrawerOpen={handleOnDialogDrawerOpen}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="border-b border-border"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name"
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

          <Button
            type="submit"
            className="w-full h-10 shadow-none rounded-xl mb-5"
          >
            {loading ? <Loader className="size-5 animate-spin" /> : "Save"}
          </Button>
        </form>
      </Form>

      <div>
        <h3 className="text-lg text-copy font-semibold mb-1">
          Change Password
        </h3>
        <p className="text-sm text-copy-light mb-4">
          Secure your account by updating your current password. Choose a
          strong, unique one you haven't used before.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="w-full h-10 shadow-none rounded-xl"
          onClick={handleCreatePassword}
        >
          {isResetPasswordPending ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            "Create Password"
          )}
        </Button>
      </div>
    </>
  );
};

export default AccountSettingsForm;
