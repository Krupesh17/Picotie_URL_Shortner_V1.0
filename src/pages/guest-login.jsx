import React, { useEffect, useState } from "react";
import { useLogIn } from "@/tanstack-query/queries";
import { useNavigate, useSearchParams } from "react-router-dom";

const GuestLogin = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const [isError, setError] = useState(false);

  const { mutateAsync: logIn, isPending: isLogInPending } = useLogIn();

  const handleGuestLogIn = async (email, password) => {
    try {
      const user = await logIn({
        email: email,
        password: password,
      });

      if (user) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error?.message);
      setError(true);
    }
  };

  useEffect(() => {
    if (email && password) {
      handleGuestLogIn(email, password);
    } else {
      setError(true);
      navigate("/sign-in", { replace: true });
    }
  }, [email, password, navigate]);

  useEffect(() => {
    document.title = "Guest Login - Picotie";
  }, []);

  return (
    <section className="relative min-h-dvh w-full bg-background flex items-center px-2.5">
      {isLogInPending ? (
        <div className="max-w-[550px] mx-auto flex flex-col items-center">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png"
            alt="Rocket"
            className="size-[60px] mb-5"
          />

          <div className="space-y-3 mb-5">
            <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
              Logging You In
              <>
                <span className="dot text-purply-blue">.</span>
                <span className="dot text-purply-blue">.</span>
                <span className="dot text-purply-blue">.</span>
              </>
            </h2>
            <p className="sm:text-lg text-base text-copy-light text-center">
              Guest login is in progress. Please wait while authentication
              completes.
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="max-w-[550px] mx-auto flex flex-col items-center">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png"
            alt="Downcast Face with Sweat"
            className="size-[60px] mb-5"
          />
          <div className="space-y-3 mb-5">
            <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
              Guest Log In Error
            </h2>
            <p className="sm:text-lg text-base text-copy-light text-center">
              Guest login attempt failed. Please check credentials and try
              again.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-[550px] mx-auto flex flex-col items-center">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
            alt="Party Popper"
            className="size-[60px] mb-5"
          />
          <div className="space-y-3 mb-5">
            <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
              Guest Log In Successful
            </h2>
            <p className="sm:text-lg text-base text-copy-light text-center">
              You've logged in successfully. Enjoy your session!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GuestLogin;
