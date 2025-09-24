import React, { useCallback, useState } from "react";
import {
  CopyCheckIcon,
  CopyIcon,
  LoaderIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from "lucide-react";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import { TooltipWrapper } from ".";
import { useDeleteFile, useDeleteURL } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { updateShortLinksData } from "@/redux/slices/dashboard_slice";

const ShortLinkCardButtonGroup = ({ shortLinkData }) => {
  const { shortLinks } = useSelector((state) => state.dashboard);

  const [isURLCopied, setURLCopied] = useState(false);

  const dispatch = useDispatch();

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

  const { mutateAsync: deleteQrCode, isPending: isDeletingQrCode } =
    useDeleteFile();
  const { mutateAsync: deleteShortURL, isPending: isDeletingShortURL } =
    useDeleteURL();

  const handleDeleteShortURL = async () => {
    try {
      const shortUrlId = shortLinkData?.id;

      if (shortLinkData?.qr_code_url) {
        const path = shortLinkData?.qr_code_url.match(/qr_codes\/(.+)/)[1];

        await deleteQrCode({
          bucket_name: "qr_codes",
          path: path,
        });
      }

      await deleteShortURL(shortLinkData?.id);

      const updatedShortLinks = await shortLinks?.filter(
        (item) => item?.id !== shortUrlId
      );

      dispatch(updateShortLinksData(updatedShortLinks));
    } catch (error) {
      console.error("Failed to delete link:", error.message);
    }
  };

  const actionButtons = [
    {
      label: "Copy",
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
      icon:
        isDeletingQrCode || isDeletingShortURL ? (
          <LoaderIcon className="size-5 animate-spin" />
        ) : (
          <Trash2Icon className="size-5" />
        ),
      className: "max-sm:ml-auto",
      onClick: () => handleDeleteShortURL(),
    },
  ];

  return (
    <ul className="flex items-center gap-2.5">
      {actionButtons?.map((item, index) => (
        <li key={index} className={`${item?.className}`}>
          <TooltipWrapper label={item?.label}>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className={`size-10 shrink-0 shadow-none rounded-2xl`}
              onClick={item?.onClick}
            >
              {item?.icon}
            </Button>
          </TooltipWrapper>
        </li>
      ))}
    </ul>
  );
};

export default ShortLinkCardButtonGroup;
