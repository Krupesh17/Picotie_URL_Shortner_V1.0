import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { TrendingUpIcon } from "lucide-react";

const DashboardStatsCard = ({ card_data, className }) => {
  return (
    <Card className={`rounded-4xl overflow-hidden gap-5 ${className}`}>
      <CardHeader className="max-sm:flex max-sm:items-center max-sm:justify-between">
        <ul className="flex items-center sm:justify-between sm:gap-5 gap-2.5 ">
          <li className="sm:order-1 order-2 flex flex-col">
            <h4 className="sm:text-2xl text-lg text-copy font-medium">
              {card_data?.heading}
            </h4>
            <p className="text-xs text-copy-light sm:hidden">
              {card_data?.sub_text}
            </p>
          </li>
          <li className="sm:order-2 order-1">
            <div
              className={`size-10 rounded-2xl flex items-center justify-center shrink-0 ${card_data?.bg_gradient_classNames}`}
            >
              {card_data?.icon}
            </div>
          </li>
        </ul>
        <p className="sm:hidden text-copy text-2xl font-medium">
          {card_data?.state}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 max-sm:hidden">
        <h2 className="text-copy sm:text-6xl text-5xl font-medium">
          {card_data?.state}
        </h2>
        <div className="flex items-center gap-1.5 text-copy-light">
          <TrendingUpIcon className="size-3" />
          <p className="text-xs">{card_data?.sub_text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
