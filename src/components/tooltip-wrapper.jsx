import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const TooltipWrapper = ({ children, label }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
