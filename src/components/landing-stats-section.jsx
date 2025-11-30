import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const social_trust_stats = [
  { state: "10M+", sub_title: "Links Shortened" },
  { state: "50K+", sub_title: "Happy Users" },
  { state: "99.9%", sub_title: "Uptime" },
];

const LandingStatsSection = () => {
  return (
    <section className="container px-2.5 sm:px-5 mx-auto mt-[100px] max-sm:mt-20">
      <Card className="py-5 rounded-4xl gap-10 max-sm:gap-5 bg-background/10 backdrop-blur-[1px] dark:backdrop-blur-[1.5px] border-border/30">
        <CardHeader>
          <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl text-center text-copy font-bold">
            Trusted by Thousands
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-around gap-2.5 max-sm:flex-col max-sm:gap-5">
            {social_trust_stats?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-5 max-lg:gap-2.5"
              >
                <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl text-center font-semibold bg-gradient-to-r from-primary to-purply-blue bg-clip-text text-transparent">
                  {item?.state}
                </h1>
                <p className="text-2xl max-lg:text-xl max-md:text-lg text-copy-light">
                  {item?.sub_title}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LandingStatsSection;
