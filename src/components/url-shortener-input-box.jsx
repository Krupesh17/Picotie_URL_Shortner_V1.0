import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import {
  ArrowRightIcon,
  CircleAlertIcon,
  CircleSmallIcon,
  LinkIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";

const UrlShortenerInputBox = ({ className }) => {
  const { user } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAutoPasteActive, setAutoPasteActive] = useState(false);

  const validationSchema = Yup.object().shape({
    longURL: Yup.string().url(
      "Invalid URL. Please check the format and try again."
    ),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      longURL: "",
    },
  });

  const { errors } = form?.formState;

  const handleInputFocus = async () => {
    try {
      if (!isAutoPasteActive) return;

      // Request permission to read clipboard data
      const permissionStatus = await navigator.permissions.query({
        name: "clipboard-read",
      });

      // Check if permission is granted
      if (
        permissionStatus.state === "granted" ||
        permissionStatus.state === "prompt"
      ) {
        const clipboardText = await navigator.clipboard.readText();
        // Update the state with the clipboard text
        form.setValue("longURL", clipboardText);
      } else {
        // Handle cases where permission is denied
        throw new Error("Permission to read clipboard was denied.");
      }
    } catch (err) {
      form?.setError("longURL", {
        type: "manual",
        message:
          "Clipboard access was denied due to missing permissions or lack of user interaction.",
      });
      console.error("Failed to read clipboard contents:", err?.message);
    }
  };

  const handleSubmit = (value) => {
    if (value?.longURL?.trim() === "") {
      form?.setError("longURL", {
        type: "manual",
        message: "URL is required. Please provide a valid link.",
      });
      return;
    }

    if (!user) {
      dispatch(
        setAuthFormsDialogActive({
          isAuthDialogActive: true,
          navigateTo: `/dashboard?create=${value?.longURL}`,
        })
      );
      return;
    }

    if (value?.longURL) {
      navigate(`/dashboard?create=${value?.longURL}`);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`sm:h-20 h-[60px] w-full max-w-[650px] mx-auto py-2.5 px-1.5 flex items-center gap-2.5 border-4 border-border sm:rounded-4xl rounded-3xl bg-card focus-within:ring-2 focus-within:ring-ring/80 transition-[color,box-shadow] ${className}`}
        >
          <LinkIcon className="text-muted-foreground shrink-0 sm:size-6 size-5 ml-2.5" />

          <FormField
            control={form.control}
            name="longURL"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your URL here"
                    className="w-full border-0 shadow-none md:text-base focus-visible:ring-0 !bg-transparent"
                    onFocus={handleInputFocus}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl px-5 max-sm:hidden"
          >
            Shorten Now!
          </Button>
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-2xl sm:hidden"
          >
            <ArrowRightIcon />
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-2.5 items-center">
        <p className="text-sm">
          {errors?.longURL ? (
            <span className="flex items-center gap-2 text-red-600">
              <CircleAlertIcon className="size-4 shrink-0" />
              <span className="sm:text-sm text-xs">
                {errors?.longURL?.message}
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-copy-light">
              <CircleSmallIcon className="size-4 animate-pulse fill-green-600 text-green-600" />
              Your shortened link will be ready in seconds
            </span>
          )}
        </p>

        <div className="flex items-center gap-2.5">
          <Switch
            checked={isAutoPasteActive}
            onCheckedChange={() =>
              setAutoPasteActive((prevState) => !prevState)
            }
            className="shrink-0"
          />
          <span className="text-sm text-copy-light">
            Auto Paste from Clipboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default UrlShortenerInputBox;
