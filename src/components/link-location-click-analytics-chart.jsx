import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, MapPinnedIcon } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Button } from "./ui/button";
import { TooltipWrapper } from ".";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const LinkLocationClickAnalyticsChart = ({ time_period, clicks_Data }) => {
  const [drillDownLevel, setDrillDownLevel] = useState("countries");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentLocationList, setCurrentLocationList] = useState([]);

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

    const filteredClicks = clicks_Data.filter((click) => {
      const clickDate = new Date(click.created_at);
      return clickDate >= startDate && clickDate <= endDate;
    });

    const processLocationData = (
      field,
      filterCountry = null,
      filterRegion = null
    ) => {
      let clicksToProcess = filteredClicks;

      if (filterCountry) {
        clicksToProcess = clicksToProcess.filter(
          (click) => click.country === filterCountry
        );
      }
      if (filterRegion) {
        clicksToProcess = clicksToProcess.filter(
          (click) => click.region === filterRegion
        );
      }

      const counts = clicksToProcess.reduce((acc, click) => {
        const key = click[field];
        if (!acc[key]) {
          acc[key] = {
            name: key,
            count: 0,
            details: [],
          };
        }
        acc[key].count++;
        acc[key].details.push(click);
        return acc;
      }, {});

      const totalClicks = Object.values(counts).reduce(
        (sum, item) => sum + item.count,
        0
      );

      return Object.values(counts)
        .map((item) => ({
          ...item,
          percentage:
            totalClicks > 0 ? Math.round((item.count / totalClicks) * 100) : 0,
          displayName:
            item.name.length > 20
              ? capitalizeFirstLetter(item.name.substring(0, 20) + "...")
              : capitalizeFirstLetter(item.name),
        }))
        .sort((a, b) => b.count - a.count);
    };

    let currentLocations = [];
    if (drillDownLevel === "countries") {
      currentLocations = processLocationData("country");
    } else if (drillDownLevel === "regions" && selectedCountry) {
      currentLocations = processLocationData("region", selectedCountry);
    } else if (drillDownLevel === "cities" && selectedRegion) {
      currentLocations = processLocationData(
        "city",
        selectedCountry,
        selectedRegion
      );
    }
    setCurrentLocationList(currentLocations);
  }, [
    time_period,
    clicks_Data,
    drillDownLevel,
    selectedCountry,
    selectedRegion,
  ]);

  const handleLocationClick = (item) => {
    if (drillDownLevel === "countries") {
      setSelectedCountry(item.name);
      setDrillDownLevel("regions");
    } else if (drillDownLevel === "regions") {
      setSelectedRegion(item.name);
      setDrillDownLevel("cities");
    }
  };

  const handleBackButtonClick = () => {
    if (drillDownLevel === "cities") {
      setDrillDownLevel("regions");
      setSelectedRegion(null);
    } else if (drillDownLevel === "regions") {
      setDrillDownLevel("countries");
      setSelectedCountry(null);
    }
  };

  const getLocationViewTitle = () => {
    if (drillDownLevel === "countries") return "Top Countries";
    if (drillDownLevel === "regions" && selectedCountry)
      return `Regions in ${capitalizeFirstLetter(selectedCountry)}`;
    if (drillDownLevel === "cities" && selectedRegion)
      return `Cities in ${capitalizeFirstLetter(
        selectedRegion
      )}, ${capitalizeFirstLetter(selectedCountry)}`;
    return "Locations";
  };

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "#144ee3",
    },
  };

  return (
    <div className="p-5 bg-card border border-border rounded-3xl">
      <div className="space-y-1 pb-4 border-b border-border mb-4">
        <h4 className="text-xl text-copy font-semibold">Clicks by Location</h4>
        <p className="text-sm text-copy-light">
          Distribution by country, region and city.
        </p>
      </div>

      <div className="w-full h-80">
        <div className="h-full flex flex-col">
          {(drillDownLevel === "regions" || drillDownLevel === "cities") && (
            <section className="flex items-center gap-2 text-xs font-medium text-copy-light mb-4">
              <TooltipWrapper label="Back">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleBackButtonClick}
                  className="w-6 h-6 [&_svg]:size-5 underline-offset-1 hover:text-copy"
                >
                  <ChevronLeftIcon />
                </Button>
              </TooltipWrapper>

              <div className="flex items-center">
                {selectedCountry && (
                  <>
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        setDrillDownLevel("countries");
                        setSelectedCountry(null);
                        setSelectedRegion(null);
                      }}
                    >
                      {capitalizeFirstLetter(selectedCountry)}
                    </span>
                    {selectedRegion && (
                      <>
                        <span className="text-copy-lighter mx-1">/</span>

                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() => {
                            setDrillDownLevel("regions");
                            setSelectedRegion(null);
                          }}
                        >
                          {capitalizeFirstLetter(selectedRegion)}
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            </section>
          )}

          {currentLocationList.length > 0 ? (
            <>
              <h4 className="text-md font-semibold text-copy mb-2">
                {getLocationViewTitle()}
              </h4>
              {drillDownLevel !== "cities" ? (
                <ul className="flex-grow overflow-y-auto">
                  {currentLocationList.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => handleLocationClick(item)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between focus-visible:ring-0 focus-visible:bg-secondary"
                      >
                        <span className="font-medium text-copy">
                          {item.displayName}
                        </span>
                        <span className="text-primary text-sm">
                          {item.count}
                          {item.count > 1 ? " Clicks" : " Click"}
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto w-full h-60"
                >
                  <BarChart
                    accessibilityLayer
                    data={currentLocationList}
                    margin={{
                      top: 20,
                    }}
                    maxBarSize={50}
                  >
                    <CartesianGrid vertical={false} />

                    <XAxis
                      dataKey="displayName"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      fontSize={12}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          nameKey="clicks"
                          labelFormatter={(label) => {
                            const item = currentLocationList.find(
                              (d) => d.displayName === label
                            );
                            return item
                              ? capitalizeFirstLetter(item.name)
                              : label;
                          }}
                        />
                      }
                    />
                    <Bar dataKey="count" fill="#144ee3" radius={4}>
                      <LabelList
                        dataKey="count"
                        position="top"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-copy-light flex-grow">
              <div className="text-center">
                <MapPinnedIcon
                  size={40}
                  strokeWidth={1}
                  className="mx-auto mb-2 text-copy-lighter"
                />
                <p className="font-medium">
                  No location data available for this selection.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkLocationClickAnalyticsChart;
