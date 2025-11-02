import React, { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateClick, useGetLongURL } from "@/tanstack-query/queries";
import { useParams } from "react-router-dom";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

const RedirectLink = () => {
  const { url_slug } = useParams();

  const [isError, setError] = useState(false);

  const { mutateAsync: getLongURL, isPending: isLongUrlLoading } =
    useGetLongURL();
  const { mutateAsync: createClick, isPending: isCreatingClick } =
    useCreateClick();

  const handleRedirect = useCallback(async () => {
    try {
      setError(false);

      if (!url_slug) {
        throw new Error("Please check url and try again.");
      }

      const longUrlData = await getLongURL(url_slug);

      if (!longUrlData?.original_url) {
        throw new Error("Invalid URL or URL not found.");
      }

      await createClick(longUrlData?.id);

      window.location.href = longUrlData.original_url;
    } catch (error) {
      setError(true);
      console.error("Redirect error:", error?.message || error);
    }
  }, [url_slug, getLongURL, createClick]);

  useEffect(() => {
    if (url_slug) {
      handleRedirect();
    }
  }, [url_slug, handleRedirect]);

  useEffect(() => {
    document.title = "Redirect Link - Picotie";
  }, []);

  return (
    <div className="relative min-h-dvh w-full bg-background flex items-center px-2.5">
      <div className="max-w-[550px] mx-auto flex flex-col items-center">
        {isError ? (
          <>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png"
              alt="Downcast Face with Sweat"
              className="size-[60px] mb-5"
            />

            <div className="space-y-3 mb-5">
              <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
                Oops! Link Not Found
              </h2>

              <p className="sm:text-lg text-base text-copy-light text-center">
                We couldn't find a matching destination for this link. It may be
                expired or incorrect. Please check the URL and try again. <br />
                You can close this tab now.
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png"
              alt="Rocket"
              className="size-[60px] mb-5"
            />

            <div className="space-y-3 mb-5">
              <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
                Redirecting you in a moment
                {(isLongUrlLoading || isCreatingClick) && (
                  <>
                    <span className="dot text-purply-blue">.</span>
                    <span className="dot text-purply-blue">.</span>
                    <span className="dot text-purply-blue">.</span>
                  </>
                )}
              </h2>

              <p className="sm:text-lg text-base text-copy-light text-center">
                You're being securely redirected to your destination. If you are
                not redirected automatically, please click the button below.
              </p>
            </div>

            <Button
              type="button"
              onClick={handleRedirect}
              disabled={isLongUrlLoading || isCreatingClick}
              className="sm:h-[60px] sm:!px-5 sm:rounded-3xl h-10 rounded-2xl mx-auto bg-black hover:bg-black/90 hover:gap-4 focus-visible:gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLongUrlLoading || isCreatingClick ? (
                <>
                  <LoaderIcon className="size-5 animate-spin mr-2" />
                  Redirecting...
                </>
              ) : (
                <>
                  Click to Redirect Now
                  <ArrowRightIcon className="size-5" />
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RedirectLink;
