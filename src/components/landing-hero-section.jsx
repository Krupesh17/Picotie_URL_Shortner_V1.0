import React from "react";
import { Badge } from "./ui/badge";
import { SparklesIcon } from "lucide-react";
import { UrlShortenerInputForm } from "./forms";

const LandingHeroSection = () => {
  return (
    <section className="container px-2.5 sm:px-5 mx-auto mt-[100px] max-sm:mt-20">
      <div className="flex flex-col gap-10 max-sm:gap-5">
        <Badge className="h-10 px-4 border border-border bg-badge text-primary sm:text-base rounded-full [&>svg]:size-5 gap-2.5 mx-auto">
          <SparklesIcon />
          <span className="text-wrap line-clamp-2">
            Free URL Shortener - No Registration Required
          </span>
        </Badge>

        <div className="mx-auto">
          <h1 className="text-center font-bold text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-5xl">
            <span className="block text-copy">Shorten URLs</span>
            <span className="block bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
              Instantly & Free
            </span>
          </h1>
        </div>

        <p className="max-w-[1100px] mx-auto text-copy-light text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg text-center">
          Transform long, complex URLs into clean, shareable links with QR
          codes. Perfect for social media, marketing campaigns, and professional
          use.
        </p>

        <div className="flex flex-col gap-5">
          <div className="w-full">
            <UrlShortenerInputForm type="landing" />
          </div>
          <p className="text-base text-copy-light text-center mx-auto">
            Fast, simple, powerful. Register to shorten instantly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingHeroSection;
