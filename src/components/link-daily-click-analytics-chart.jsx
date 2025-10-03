import React, { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const LinkDailyClickAnalyticsChart = ({ time_period, clicks }) => {
  const [clickChartData, setClickChartData] = useState([]);

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "#144ee3",
    },
  };

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();

    switch (time_period) {
      case "last7days":
        startDate.setDate(startDate.getDate() - 6); // 6 days back + today = 7 days total
        break;
      case "last28days":
        startDate.setDate(startDate.getDate() - 27); // 27 days back + today = 28 days total
        break;
      case "last3months":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      default:
        startDate.setDate(startDate.getDate() - 6); // Default to 7 days
    }

    // Set time to start of day for startDate and end of day for endDate to ensure full day coverage
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const dailyData = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toDateString();
      const clicksForDate = clicks?.filter((click) => {
        const clickDate = new Date(click.created_at).toDateString();
        return clickDate === dateStr;
      }).length;

      let dateLabel;
      if (time_period === "last3months") {
        dateLabel = d.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } else {
        dateLabel = d.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      dailyData.push({
        date: dateLabel,
        fullDate: d.toISOString().split("T")[0],
        clicks: clicksForDate,
      });
    }

    setClickChartData(dailyData);
  }, [time_period]);

  return (
    <div className="p-5 bg-card border border-border rounded-3xl mb-5">
      <div className="space-y-1 pb-4 border-b border-border mb-4">
        <h4 className="text-xl text-copy font-semibold">Clicks by Date</h4>
        <p className="text-sm text-copy-light">
          Click activity and engagement over time.
        </p>
      </div>

      <div className="w-full h-80">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto w-full h-full px-4"
        >
          <LineChart accessibilityLayer data={clickChartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  nameKey="clicks"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />

            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#144ee3"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default LinkDailyClickAnalyticsChart;
