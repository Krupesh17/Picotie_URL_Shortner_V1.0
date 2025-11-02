import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleBackButton = () => {
    if (user) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    document.title = "Error 404 - Picotie";
  }, []);

  return (
    <section className="relative min-h-dvh w-full bg-background flex items-center px-2.5">
      <div className="max-w-[550px] mx-auto flex flex-col items-center">
        <div className="flex items-center gap-1 mb-4">
          <span className="text-7xl text-copy font-semibold">4</span>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Dizzy%20Face.png"
            alt="Dizzy Face"
            className="size-[60px]"
          />
          <span className="text-7xl text-copy font-semibold">4</span>
        </div>

        <div className="space-y-3 mb-6">
          <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="sm:text-lg text-base text-copy-light text-center">
            The page you are looking for was moved, removed, renamed or might
            never existed.
          </p>
        </div>

        <Button
          type="button"
          className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl px-5"
          onClick={handleBackButton}
        >
          Back to Picotie
        </Button>
      </div>
    </section>
  );
};

export default Error404;
