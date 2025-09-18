import React from "react";
import { Button } from "./ui/button";
import { Users2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";

const LandingCallToActionSection = () => {
  const dispatch = useDispatch();
  
  return (
    <section className="container px-2.5 sm:px-5 mx-auto mt-[100px] max-sm:mt-20">
      <div className="flex flex-col gap-5 max-sm:gap-2.5 mb-10 max-sm:mb-5">
        <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl text-center text-copy font-bold">
          Ready to Get Started?
        </h1>
        <p className="text-center text-2xl max-lg:text-xl max-md:text-lg text-copy-light">
          Join thousands of users who trust Picotie for their URL shortening
          needs.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          onClick={() => dispatch(setAuthFormsDialogActive(true))}
          className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl !px-4 sm:!px-10"
        >
          <Users2Icon className="size-6" />
          Create Free Account
        </Button>
      </div>
    </section>
  );
};

export default LandingCallToActionSection;
