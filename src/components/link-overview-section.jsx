import React, { useCallback, useState } from "react";
import { ShortLinkDeleteDialog, TooltipWrapper } from ".";
import {
  CalendarIcon,
  CopyCheckIcon,
  CopyIcon,
  DownloadIcon,
  LinkIcon,
  MousePointerClickIcon,
  QrCodeIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { debounce } from "lodash";

const LinkOverviewSection = ({ shortLinkData }) => {
  const [isURLCopied, setURLCopied] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const debounceURLCopied = useCallback(
    debounce(() => {
      setURLCopied(false);
    }, 1000),
    []
  );

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${
          shortLinkData?.custom_url
            ? shortLinkData?.custom_url
            : shortLinkData?.short_url
        }`
      );
      setURLCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error.message);
    } finally {
      debounceURLCopied();
    }
  };

  const handleOpenInNewTab = () => {
    try {
      if (!shortLinkData) {
        throw new Error("shortLinkData is undefined or null");
      }

      const urlPath = shortLinkData.custom_url || shortLinkData.short_url;
      if (!urlPath) {
        throw new Error("No valid URL path found in shortLinkData");
      }

      const fullUrl = new URL(urlPath, window.location.origin).toString();

      window.open(fullUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to open in new tab:", error?.message || error);
    }
  };

  const downloadQRCode = async () => {
    try {
      const response = await fetch(shortLinkData?.qr_code_url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-code-${
        shortLinkData?.title?.toLowerCase()?.replace(/ /g, "-") || "download"
      }.png`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);

      window.open(shortLinkData?.qr_code_url, "_blank");
    }
  };

  const actionButtons = [
    {
      label: isURLCopied ? "Copied" : "Copy",
      icon: isURLCopied ? (
        <CopyCheckIcon className="size-5" />
      ) : (
        <CopyIcon className="size-5" />
      ),
      className: "",
      onClick: () => handleCopyURL(),
    },
    {
      label: "Open in New Tab",
      icon: <SquareArrowOutUpRightIcon className="size-5" />,
      className: "",
      onClick: () => handleOpenInNewTab(),
    },
    {
      label: "Delete",
      icon: <Trash2Icon className="size-5" />,
      className: "ml-auto",
      onClick: () => setDeleteDialogOpen(true),
    },
  ];

  return (
    <>
      <ShortLinkDeleteDialog
        isDialogOpen={isDeleteDialogOpen}
        setDialogOpen={setDeleteDialogOpen}
        shortLinkData={shortLinkData}
      />

      <section className="container px-2.5 sm:px-5 mx-auto mt-[100px] max-sm:mt-20">
        <div className="flex items-center sm:gap-5 gap-2.5 mb-10">
          <div className="sm:size-[60px] size-10 sm:rounded-3xl rounded-2xl shrink-0 bg-linear-to-b from-neon-blue to-azul flex items-center justify-center">
            <LinkIcon className="text-white sm:size-10 size-6" />
          </div>
          <div className="flex flex-col">
            <h4 className="sm:text-3xl text-lg text-copy font-medium">
              Link Overview
            </h4>
            <p className="sm:text-sm text-xs text-copy-light">
              Review link details including URL, date, activity and QR code.
            </p>
          </div>
        </div>

        <div className="p-5 w-full bg-card border border-border rounded-3xl space-y-5">
          <div className="grid lg:grid-cols-[1fr_260px] grid-cols-1 gap-5 w-full">
            <div className="relative w-full">
              <div className="flex flex-col mb-10">
                <h1 className="flex text-copy lg:text-5xl md:text-3xl text-2xl font-semibold mb-3">
                  {shortLinkData?.title}
                </h1>
                <p className="flex lg:text-3xl md:text-2xl text-xl bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent sm:mb-5 mb-3">
                  <Link
                    to={`${window?.location?.origin}/${
                      shortLinkData?.custom_url
                        ? shortLinkData?.custom_url
                        : shortLinkData?.short_url
                    }`}
                    target="_blank"
                    className="outline-none hover:decoration-2 focus-visible:decoration-2 decoration-transparent hover:decoration-primary focus-visible:decoration-primary underline truncate"
                    onClick={(event) => event?.stopPropagation()}
                  >
                    {`${window?.location?.origin}/${
                      shortLinkData?.custom_url
                        ? shortLinkData?.custom_url
                        : shortLinkData?.short_url
                    }`}
                  </Link>
                </p>
                <div className="flex items-center gap-1.5">
                  <LinkIcon className="md:size-5 size-4 shrink-0" />
                  <Link
                    to={shortLinkData?.original_url}
                    target="_blank"
                    className="lg:text-xl md:text-lg text-sm truncate outline-none hover:underline focus-visible:underline"
                    onClick={(event) => event?.stopPropagation()}
                  >
                    {shortLinkData?.original_url}
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-5 max-lg:justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="sm:size-6 size-5 shrink-0" />
                  <p className="sm:text-base text-sm">
                    {shortLinkData?.created_at?.split("T")[0]}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <MousePointerClickIcon className="sm:size-6 size-5 shrink-0" />
                  <p className="sm:text-base text-sm">
                    {shortLinkData?.clicks?.length === 1
                      ? "1 click"
                      : shortLinkData?.clicks.length > 0
                      ? `${shortLinkData?.clicks?.length} clicks`
                      : "0 clicks"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between gap-2.5 lg:hidden mb-5">
                <p className="text-copy font-medium flex items-center gap-1.5">
                  <QrCodeIcon className="size-5" /> QR Code
                </p>
                <Button
                  type="button"
                  className="h-10 rounded-2xl"
                  onClick={downloadQRCode}
                >
                  <DownloadIcon className="size-5" /> <span>Download</span>
                </Button>
              </div>

              <div className="relative bg-popover md:size-[260px] size-[200px] mx-auto overflow-hidden rounded-3xl group">
                <TooltipWrapper label="Download QR Code">
                  <Button
                    size="icon"
                    className="max-lg:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-10 rounded-2xl shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={downloadQRCode}
                  >
                    <DownloadIcon className="size-5" />
                  </Button>
                </TooltipWrapper>
                <img
                  src={shortLinkData?.qr_code_url}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          <ul className="flex items-center gap-5 border-t border-border pt-5">
            {actionButtons?.map((item, index) => (
              <li key={index} className={`${item?.className}`}>
                <TooltipWrapper label={item?.label}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="size-[60px] max-md:size-10 sm:w-auto md:!px-5 sm:px-3 md:rounded-3xl rounded-2xl"
                    onClick={item?.onClick}
                  >
                    {item?.icon}
                    <span className="max-sm:hidden">{item?.label}</span>
                  </Button>
                </TooltipWrapper>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default LinkOverviewSection;
