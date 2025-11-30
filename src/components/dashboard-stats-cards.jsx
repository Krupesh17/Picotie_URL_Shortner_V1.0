import React, { useMemo } from "react";
import { ChartColumnIcon, LinkIcon, MousePointerClickIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { CarouselViewBox, DashboardStatsCard } from ".";
import { useMediaQuery } from "usehooks-ts";

const DashboardStatsCards = () => {
  const { shortLinks, clicks } = useSelector((state) => state.dashboard);

  const isDesktop = useMediaQuery("(min-width: 768px)");

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
      {isDesktop ? (
        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-5 gap-2.5">
          {dashboardStatsCardInfoList?.map((item, index) => (
            <DashboardStatsCard key={index} card_data={item} />
          ))}
        </div>
      ) : (
        <CarouselViewBox
          contentListForDotNavigation={dashboardStatsCardInfoList}
        >
          {dashboardStatsCardInfoList?.map((item, index) => (
            <DashboardStatsCard
              key={index}
              card_data={item}
              className={"w-full flex-shrink-0"}
            />
          ))}
        </CarouselViewBox>
      )}
    </section>
  );
};

export default DashboardStatsCards;
