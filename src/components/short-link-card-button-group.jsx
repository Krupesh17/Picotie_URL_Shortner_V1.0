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
import { ShortLinkDeleteDialog, TooltipWrapper } from ".";

const ShortLinkCardButtonGroup = ({ shortLinkData }) => {
  const [isURLCopied, setURLCopied] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const debounceURLCopied = useCallback(
    debounce(() => {
      setURLCopied(false);
    }, 1000),
    [],
  );

  const handleCopyURL = async (event) => {
    try {
      event?.stopPropagation();
      await navigator.clipboard.writeText(
        `${window.location.origin}/${
          shortLinkData?.custom_url
            ? shortLinkData?.custom_url
            : shortLinkData?.short_url
        }`,
      );
      setURLCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error.message);
    } finally {
      debounceURLCopied();
    }
  };

  const handleOpenInNewTab = (event) => {
    try {
      event?.stopPropagation();
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

  const handleDelete = (event) => {
    event.stopPropagation();
    setDeleteDialogOpen(true);
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
      onClick: (event) => handleCopyURL(event),
    },
    {
      label: "Open in New Tab",
      icon: <SquareArrowOutUpRightIcon className="size-5" />,
      className: "",
      onClick: (event) => handleOpenInNewTab(event),
    },
    {
      label: "Delete",
      icon: <Trash2Icon className="size-5" />,
      className: "max-sm:ml-auto",
      onClick: (event) => handleDelete(event),
    },
  ];

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <ShortLinkDeleteDialog
          isDialogOpen={isDeleteDialogOpen}
          setDialogOpen={setDeleteDialogOpen}
          shortLinkData={shortLinkData}
        />
      </div>

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
    </>
  );
};

export default ShortLinkCardButtonGroup;
