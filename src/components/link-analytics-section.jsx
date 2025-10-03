import React, { useState } from "react";
import { ChartColumnIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LinkDailyClickAnalyticsChart,
  LinkDeviceClickAnalyticsChart,
  LinkLocationClickAnalyticsChart,
} from ".";

const LinkAnalyticsSection = ({ shortLinkData }) => {
  const [timePeriod, setTimePeriod] = useState("last7days");

  return (
    <section className="container px-2.5 sm:px-5 mx-auto mt-20 max-sm:mt-20">
      <div className="flex items-center justify-between gap-2.5 mb-10">
        <div className="flex items-center sm:gap-5 gap-2.5">
          <div className="sm:size-[60px] size-10 sm:rounded-3xl rounded-2xl shrink-0 bg-linear-to-b from-goldenrod to-strawberry flex items-center justify-center">
            <ChartColumnIcon className="text-white sm:size-10 size-6" />
          </div>
          <div className="flex flex-col">
            <h4 className="sm:text-3xl text-lg text-copy font-medium">
              Link Analytics
            </h4>
            <p className="sm:text-sm text-xs text-copy-light">
              Track audience engagement, from clicks to interaction patterns.
            </p>
          </div>
        </div>

        <Select
          defaultValue={timePeriod}
          onValueChange={(value) => setTimePeriod(value)}
        >
          <SelectTrigger className="sm:px-5 sm:w-[160px] w-[150px] sm:!h-[60px] !h-10 text-sm sm:rounded-3xl rounded-2xl">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last28days">Last 28 days</SelectItem>
              <SelectItem value="last3months">Last 3 months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <LinkDailyClickAnalyticsChart
        time_period={timePeriod}
        clicks={shortLinkData?.clicks}
      />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-10">
        {shortLinkData && (
          <LinkDeviceClickAnalyticsChart
            time_period={timePeriod}
            clicks={shortLinkData?.clicks}
          />
        )}

        {shortLinkData && (
          <LinkLocationClickAnalyticsChart
            time_period={timePeriod}
            clicks_Data={shortLinkData?.clicks}
          />
        )}
      </div>
    </section>
  );
};

export default LinkAnalyticsSection;
