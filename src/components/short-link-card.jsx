import React from "react";
import {
  CalendarIcon,
  DownloadIcon,
  LinkIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { ShortLinkCardButtonGroup, TooltipWrapper } from ".";

const ShortLinkCard = ({ shortLinkData }) => {
  const { clicks } = useSelector((state) => state.dashboard);

  const clicksData = clicks.filter((click) => {
    return click?.url_id === shortLinkData?.id;
  });

  const downloadQRCode = async () => {
    try {
      // Fetch the QR code image
      const response = await fetch(shortLinkData?.qr_code_url);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-code-${
        shortLinkData?.title?.toLowerCase()?.replace(/ /g, "-") || "download"
      }.png`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
      // Fallback: open in new tab if download fails
      window.open(shortLinkData?.qr_code_url, "_blank");
    }
  };

  return (
    <li className="w-full sm:h-[200px] p-5 bg-card border border-border rounded-3xl flex items-start gap-5 max-sm:flex-col overflow-hidden shadow">
      <div className="relative sm:flex-1 sm:min-w-0 sm:h-full w-full h-[220px]">
        <div className="flex flex-col gap-2.5">
          <h4 className="text-copy sm:text-3xl text-2xl font-semibold truncate">
            {shortLinkData?.title}
          </h4>
          <p className="sm:text-2xl text-xl bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent truncate">
            {`${window?.location?.origin}/${
              shortLinkData?.custom_url
                ? shortLinkData?.custom_url
                : shortLinkData?.short_url
            }`}
          </p>
          <div className="flex items-center gap-1.5">
            <LinkIcon className="size-5 shrink-0" />
            <p className="text-sm truncate">{shortLinkData?.original_url}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex sm:items-center sm:justify-between gap-2.5 max-sm:gap-4 max-sm:flex-col-reverse">
            <div className="flex items-center gap-5 max-sm:justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-5 shrink-0" />
                <small className="text-sm">
                  {shortLinkData?.created_at?.split("T")[0]}
                </small>
              </div>

              <div className="flex items-center gap-2">
                <MousePointerClickIcon className="size-5 shrink-0" />
                <small className="text-sm">
                  {clicksData?.length === 1
                    ? "1 click"
                    : clicksData.length > 0
                    ? `${clicksData?.length} clicks`
                    : "0 clicks"}
                </small>
              </div>
            </div>

            <ShortLinkCardButtonGroup shortLinkData={shortLinkData} />
          </div>
        </div>
      </div>

      <div className="relative aspect-square bg-popover size-[160px] max-sm:size-[200px] mx-auto shrink-0 overflow-hidden rounded-xl group">
        <TooltipWrapper label="Download QR Code">
        <Button
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-10 rounded-2xl shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
    </li>
  );
};

export default ShortLinkCard;
