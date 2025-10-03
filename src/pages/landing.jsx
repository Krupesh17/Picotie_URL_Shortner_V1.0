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

const Landing = () => {
  const [isRegisterFormActive, setRegisterFormActive] = useState(false);

  return (
    <>
      <LoginRegisterDialog
        isRegisterFormActive={isRegisterFormActive}
        setRegisterFormActive={setRegisterFormActive}
      />

      <div
        className="relative min-h-dvh w-full bg-background"
        style={{
          background: "url('/assets/images/bg-pattern-white.svg')",
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
  