import React, { useEffect, useState } from "react";
import { LinkIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CreateNewShortenedUrlDialog, ShortLinkCard } from ".";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLinksSection = () => {
  const { shortLinks } = useSelector((state) => state.dashboard);

  const [isCrateNewShortenerUrlDialogOpen, setCrateNewShortenerUrlDialogOpen] =
    useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("create");

  useEffect(() => {
    if (longLink) {
      setCrateNewShortenerUrlDialogOpen(true);
    }
  }, [longLink]);

  return (
    <>
      <CreateNewShortenedUrlDialog
        isDialogOpen={isCrateNewShortenerUrlDialogOpen}
        setDialogOpen={setCrateNewShortenerUrlDialogOpen}
        setSearchParams={setSearchParams}
        longLink={longLink}
      />

      <section className="container p-2.5 sm:p-5 mx-auto mt-10 max-sm:mt-5">
        <div className="flex items-center justify-between gap-2.5 mb-10">
          <div className="flex items-center sm:gap-5 gap-2.5">
            <div className="sm:size-[60px] size-10 sm:rounded-3xl rounded-2xl shrink-0 bg-linear-to-b from-blueviolet to-mediumblue flex items-center justify-center">
              <LinkIcon className="text-white sm:size-10 size-6" />
            </div>
            <div className="flex flex-col">
              <h4 className="sm:text-3xl text-lg text-copy font-medium">
                My Links
              </h4>
              <p className="sm:text-sm text-xs text-copy-light">
                Manage and track your shortened URLs
              </p>
            </div>
          </div>

          <Button
            type="button"
            className="relative sm:h-[60px] h-10 sm:rounded-3xl rounded-xl sm:!px-5 max-sm:gap-1"
            onClick={() => setCrateNewShortenerUrlDialogOpen(true)}
          >
            <PlusIcon className="sm:size-6" />
            <span className="sm:hidden">Create</span>
            <span className="max-sm:hidden">Create New Link</span>
          </Button>
        </div>

        {/* Link list will appear here */}
        <ul className="flex flex-col gap-5">
          {shortLinks &&
            shortLinks?.map((shortLink) => (
              <ShortLinkCard key={shortLink?.id} shortLinkData={shortLink} />
            ))}
        </ul>
      </section>
    </>
  );
};

export default DashboardLinksSection;
