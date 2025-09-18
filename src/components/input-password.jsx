import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const InputPassword = forwardRef(({ className = "", ...props }, ref) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <div
      className={`h-10 px-3 flex items-center gap-2.5 border border-input rounded-xl focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] ${className}`}
    >
      <Input
        type={isPasswordVisible ? "text" : "password"}
        className="h-full border-none shadow-none px-0 focus-visible:ring-0"
        ref={ref}
        {...props}
      />

      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="text-copy-lighter hover:bg-transparent focus-visible:border-none focus-visible:ring-0 focus-visible:text-copy"
        onClick={() => setPasswordVisible((prevState) => !prevState)}
      >
        {isPasswordVisible ? (
          <EyeOff className="size-5" strokeWidth={1} />
        ) : (
          <Eye className="size-5" strokeWidth={1} />
        )}
      </Button>
    </div>
  );
});

export default InputPassword;
