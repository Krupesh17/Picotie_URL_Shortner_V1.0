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
import { Button } from "../ui/button";
import QRCode from "react-qrcode-logo";

const CreateShortUrlForm = ({ longLink }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      longURL: longLink ? longLink : "",
      customURL: "",
    },
  });

  const handleSubmit = (value) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(handleSubmit)}>
        {form.getValues("longURL")?.trim() !== "" && (
          <div className="flex items-center justify-center">
            <QRCode
              size={150}
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
                  type="url"
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
                  <p className="text-sm pr-1.5 border-r border-border">
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
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateShortUrlForm;
