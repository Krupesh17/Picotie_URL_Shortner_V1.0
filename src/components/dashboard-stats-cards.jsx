import React, { useMemo } from "react";
import {
  ChartColumnIcon,
  LinkIcon,
  MousePointerClickIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useSelector } from "react-redux";

const DashboardStatsCards = () => {
  const { shortLinks, clicks } = useSelector((state) => state.dashboard);

  const state = useMemo(() => {
    const totalLinks = shortLinks?.length ?? 0;
    const totalClicks = clicks?.length ?? 0;
    const averageClicks =
      totalLinks > 0 ? (totalClicks / totalLinks).toFixed(2) : "0.00";

    return {
      totalLinks,
      totalClicks,
      averageClicks,
    };
  }, [shortLinks, clicks]);

  const dashboardStatsCardInfoList = [
    {
      heading: "Total Links",
      icon: <LinkIcon className="text-white" />,
      bg_gradient_classNames: "bg-linear-to-b from-neon-blue to-azul",
      state: state?.totalLinks,
      sub_text: "Active shortened URLs",
    },
    {
      heading: "Total Clicks",
      icon: <MousePointerClickIcon className="text-white" />,
      bg_gradient_classNames: "bg-linear-to-b from-goldenrod to-strawberry",
      state: state?.totalClicks,
      sub_text: "Across all links",
    },
    {
      heading: "Avg. Clicks",
      icon: <ChartColumnIcon className="text-white" />,
      bg_gradient_classNames:
        "bg-linear-to-b from-neon-pink to-purple-daffodil",
      state: state?.averageClicks,
      sub_text: "Per link performance",
    },
  ];
  return (
    <section className="container px-2.5 py-5 sm:px-5 sm:py-10 mx-auto mt-[60px] max-sm:mt-10 border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-5 gap-2.5">
        {dashboardStatsCardInfoList?.map((item, index) => (
          <Card key={index} className="rounded-4xl overflow-hidden gap-5">
            <CardHeader className="max-sm:flex max-sm:items-center max-sm:justify-between">
              <ul className="flex items-center sm:justify-between sm:gap-5 gap-2.5 ">
                <li className="sm:order-1 order-2 flex flex-col">
                  <h4 className="sm:text-2xl text-lg text-copy font-medium">
                    {item?.heading}
                  </h4>
                  <p className="text-xs text-copy-light sm:hidden">
                    {item?.sub_text}
                  </p>
                </li>
                <li className="sm:order-2 order-1">
                  <div
                    className={`size-10 rounded-2xl flex items-center justify-center shrink-0 ${item?.bg_gradient_classNames}`}
                  >
                    {item?.icon}
                  </div>
                </li>
              </ul>
              <p className="sm:hidden text-copy text-2xl font-medium">{item?.state}</p>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 max-sm:hidden">
              <h2 className="text-copy sm:text-6xl text-5xl font-medium">
                {item?.state}
              </h2>
              <div className="flex items-center gap-1.5 text-copy-light">
                <TrendingUpIcon className="size-3" />
                <p className="text-xs">{item?.sub_text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DashboardStatsCards;
