import React, { useEffect, useState } from "react";
import {
  LandingHeroSection,
  LandingHeader,
  LandingFeaturesSection,
  LandingStatsSection,
  LandingCallToActionSection,
  LandingFooter,
  LoginRegisterDialog,
} from "@/components";
import { useTheme } from "@/components/theme-provider";

const Landing = () => {
  const [authDialogState, setAuthDialogState] = useState("login");
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Picotie";
  }, []);

  return (
    <>
      <LoginRegisterDialog
        authDialogState={authDialogState}
        setAuthDialogState={setAuthDialogState}
      />

      <div
        className="relative min-h-dvh w-full bg-background"
        style={{
          backgroundImage: `${
            theme === "dark"
              ? "url('/assets/images/bg-pattern-black.svg')"
              : "url('/assets/images/bg-pattern-white.svg')"
          }`,
          backgroundRepeat: "repeat",
          backgroundSize: "87px 50px",
        }}
      >
        <LandingHeader setAuthDialogState={setAuthDialogState} />
        <LandingHeroSection />
        <LandingFeaturesSection />
        <LandingStatsSection />
        <LandingCallToActionSection />
        <LandingFooter />
      </div>
    </>
  );
};

export default Landing;
