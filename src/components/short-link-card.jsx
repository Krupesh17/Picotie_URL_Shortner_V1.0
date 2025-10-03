import React from "react";
import {
  CalendarIcon,
  DownloadIcon,
  LinkIcon,
  MousePointerClickIcon,
  QrCodeIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { ShortLinkCardButtonGroup, TooltipWrapper } from ".";
import { Link, useNavigate } from "react-router-dom";

const ShortLinkCard = ({ shortLinkData }) => {
  const { clicks } = useSelector((state) => state.dashboard);
  const navigate = useNavigate();

  const clicksData = clicks.filter((click) => {
    return click?.url_id === shortLinkData?.id;
  });

  const downloadQRCode = async (event) => {
    try {
      event?.stopPropagation();
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
    <div
      className="w-full sm:h-[200px] p-5 bg-card border border-border rounded-3xl flex items-start gap-5 max-sm:flex-col overflow-hidden shadow"
      onClick={() => navigate(`link/${shortLinkData?.id}`)}
    >
      <div className="relative sm:flex-1 sm:min-w-0 sm:h-full w-full h-[220px]">
        <div className="flex flex-col gap-2.5">
          <h1 className="flex text-copy sm:text-3xl text-2xl font-semibold">
            <Link
              to={`link/${shortLinkData?.id}`}
              className="outline-none hover:underline focus-visible:underline truncate"
              onClick={(event) => event?.stopPropagation()}
            >
              {shortLinkData?.title}
            </Link>
          </h1>
          <p className="flex sm:text-2xl text-xl bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
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
            <LinkIcon className="size-4 shrink-0" />
            <Link
              to={shortLinkData?.original_url}
              target="_blank"
              className="text-sm truncate outline-none hover:underline focus-visible:underline"
              onClick={(event) => event?.stopPropagation()}
            >
              {shortLinkData?.original_url}
            </Link>
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
      <div className="flex flex-col gap-5 max-sm:w-full">
        <div className="flex items-center justify-between gap-2.5 sm:hidden">
          <p className="text-copy font-medium flex items-center gap-1.5">
            <QrCodeIcon className="size-5" /> QR Code
          </p>
          <Button
            type="button"
            className="h-10 rounded-2xl"
            onClick={(event) => downloadQRCode(event)}
          >
            <DownloadIcon className="size-5" /> <span>Download</span>
          </Button>
        </div>

        <div className="relative aspect-square bg-popover size-[160px] max-sm:size-[200px] mx-auto shrink-0 overflow-hidden rounded-2xl group">
          <TooltipWrapper label="Download QR Code">
            <Button
              size="icon"
              className="max-sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-10 rounded-2xl shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(event) => downloadQRCode(event)}
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
  );
};

export default ShortLinkCard;
