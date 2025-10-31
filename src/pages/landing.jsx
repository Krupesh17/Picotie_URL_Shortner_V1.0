import React, { useState } from "react";
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
  const [isRegisterFormActive, setRegisterFormActive] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <LoginRegisterDialog
        isRegisterFormActive={isRegisterFormActive}
        setRegisterFormActive={setRegisterFormActive}
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
        <LandingHeader setRegisterFormActive={setRegisterFormActive} />
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
