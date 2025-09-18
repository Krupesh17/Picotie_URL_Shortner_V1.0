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

  /**
   * First of all we have to create a redux store slice called 'uiSlice' in this slice we will have
   * property called 'isAuthFormsDialogActive' & 'error'.
   * In this slice we will also have reducer function called 'setAuthFormsDialogActive'
   * which will be responsible for changing visibility of dialog.
   */

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
