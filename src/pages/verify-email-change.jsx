import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmailChange = () => {
  const navigate = useNavigate();

  const [isError, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const updateEmailToken = searchParams.get("change_email_token");

  const changeEmailToken = localStorage.getItem("changeEmailToken");

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/", { replace: true });
    } else {
      if (
        !updateEmailToken ||
        !changeEmailToken ||
        updateEmailToken !== changeEmailToken
      ) {
        localStorage.removeItem("changeEmailToken");
        setError(true);
      }
    }
  }, [isLoading, user, updateEmailToken, changeEmailToken]);

  return (
    <section className="relative min-h-dvh w-full bg-background flex items-center px-2.5">
      {isLoading ? (
        <div className="max-w-[550px] mx-auto flex flex-col items-center">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png"
            alt="Rocket"
            className="size-[60px] mb-5"
          />

          <div className="space-y-3 mb-5">
            <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
              Securing Your New Email
              {isLoading && (
                <>
                  <span className="dot text-purply-blue">.</span>
                  <span className="dot text-purply-blue">.</span>
                  <span className="dot text-purply-blue">.</span>
                </>
              )}
            </h2>
            <p className="sm:text-lg text-base text-copy-light text-center">
              We're verifying your updated email to keep your account safe and
              connected.
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
              Email Verification Unsuccessful
            </h2>
            <p className="sm:text-lg text-base text-copy-light text-center">
              We couldn't verify your email. Please check the link or try again
              later. You may close this window.
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
              Email Change Successful
            </h2>
            <p className="sm:text-lg text-base text-copy-light text-center">
              Your new email address has been confirmed. You may now close this
              browser window.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default VerifyEmailChange;
