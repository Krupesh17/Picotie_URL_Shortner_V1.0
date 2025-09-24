import React, { useRef } from "react";
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
import { Button } from "../ui/button";
import QRCode from "react-qrcode-logo";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useCreateNewShortURL } from "@/tanstack-query/queries";
import { LoaderIcon } from "lucide-react";
import { updateShortLinksData } from "@/redux/slices/dashboard_slice";

const CreateShortUrlForm = ({ longLink, closeDialog }) => {
  const { user } = useSelector((state) => state.auth);
  const { shortLinks } = useSelector((state) => state.dashboard);
  const ref = useRef();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longURL: Yup.string()
      .url("Invalid URL. Please check the format and try again.")
      .required("Long URL is required"),
    customURL: Yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      longURL: longLink ? longLink : "",
      customURL: "",
    },
  });

  const { mutateAsync: createNewShortURL, isPending: isCreatingNewShortURL } =
    useCreateNewShortURL();

  const handleSubmit = async (value) => {
    try {
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      const response = await createNewShortURL({
        userId: user?.id,
        title: value?.title,
        longURL: value?.longURL,
        customURL: value?.customURL,
        qrCode: blob,
      });

      const updatedShortLinks = [...shortLinks];
      updatedShortLinks?.push(response[0]);

      dispatch(updateShortLinksData(updatedShortLinks));
    } catch (error) {
      console.error(error?.message);
    } finally {
      form.reset();
      closeDialog();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(handleSubmit)}>
        {form.watch("longURL") !== "" && (
          <div className="flex items-center justify-center">
            <QRCode
              ref={ref}
              size={200}
              value={form?.getValues("longURL")}
              style={{ borderRadius: 16 }}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="gap-0">
                Title <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Short link's title"
                  autoComplete="off"
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
          name="longURL"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="gap-0">
                Long URL <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your loooong URL"
                  autoComplete="off"
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
          name="customURL"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="gap-1">
                Custom URL
                <span className="text-xs text-copy-lighter">(optional)</span>
              </FormLabel>
              <FormControl>
                <div className="h-10 w-full flex items-center gap-1.5 bg-background text-copy px-3 border border-input rounded-xl overflow-hidden focus-within:ring-[3px] focus-within:ring-ring/50 transition-[color,box-shadow]">
                  <p className="pr-1.5 border-r border-border">
                    {window.location.host}
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter your custom link"
                    autoComplete="off"
                    className="h-10 text-base shadow-none rounded-xl border-none focus-visible:ring-0 px-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-10 shadow-none rounded-xl">
          {isCreatingNewShortURL ? (
            <LoaderIcon className="animate-spin size-5" />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateShortUrlForm;
