import { ChangePasswordForm } from "@/components/forms";
import { LockIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("reset_token");

  const changePasswordToken = localStorage.getItem("changePasswordToken");

  const { user } = useSelector((state) => state.auth);

  const [changePasswordState, setChangePasswordState] = useState({
    isSubmitted: false,
    isError: false,
  });

  useEffect(() => {
    if (
      !resetToken ||
      !changePasswordToken ||
      resetToken !== changePasswordToken
    ) {
      localStorage.removeItem("changePasswordToken");
      if (!changePasswordState?.isSubmitted) {
        navigate(user ? "/dashboard" : "/", { replace: true });
      }
    }
  }, [resetToken, changePasswordToken]);

  useEffect(() => {
    document.title = "Change Password - Picotie";
  }, []);

  return (
    <div className="min-h-dvh bg-background flex items-center px-2.5">
      <section
        className={`max-w-[450px] w-full mx-auto rounded-3xl p-5 overflow-hidden border border-border shadow-xl ${
          changePasswordState?.isSubmitted && "hidden"
        }`}
      >
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-center size-10 mx-auto text-white bg-gradient-to-r from-azul to-purply-blue rounded-2xl">
            <LockIcon />
          </div>
          <h4 className="text-center text-2xl text-copy font-semibold">
            Change Password
          </h4>
          <p className="text-center text-base text-copy-light">
            Enter a new password to update your current one.
          </p>
        </div>

        <ChangePasswordForm setChangePasswordState={setChangePasswordState} />
      </section>

      <section
        className={`max-w-[550px] w-full mx-auto flex flex-col items-center ${
          !changePasswordState?.isSubmitted && "hidden"
        }`}
      >
        {changePasswordState?.isError ? (
          <>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png"
              alt="Downcast Face with Sweat"
              className="size-[60px] mb-5"
            />
            <div className="space-y-3 mb-5">
              <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
                Oops! Password Change Failed
              </h2>
              <p className="sm:text-lg text-base text-copy-light text-center">
                Password change failed. An unexpected error occurred. Please try
                again later.
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
              alt="Party Popper"
              className="size-[60px] mb-5"
            />
            <div className="space-y-3 mb-5">
              <h2 className="sm:text-4xl text-2xl font-semibold text-center bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
                Password Change Successful
              </h2>
              <p className="sm:text-lg text-base text-copy-light text-center">
                Your password has been changed successfully. You may now close
                this browser window.
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ChangePassword;
