import React from "react";
import { ChartColumnIcon, QrCodeIcon, ShieldIcon, ZapIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

const features = [
  {
    icon: <ZapIcon className="sm:size-10 text-white" strokeWidth={1.5} />,
    bg_gradient_classNames: "bg-linear-to-b from-neon-blue to-azul",
    title: "Lightning Fast",
    description:
      "Effortlessly generate shortened URLs in an instant, powered by our highly optimized infrastructure designed for speed and reliability—no waiting, no delays, just seamless performance every time.",
  },
  {
    icon: <ShieldIcon className="sm:size-10 text-white" strokeWidth={1.5} />,
    bg_gradient_classNames:
      "bg-linear-to-b from-yellowish-green to-la-salle-green",
    title: "Secure & Reliable",
    description:
      "Your links are secured with enterprise-grade protocols and supported by a resilient infrastructure that guarantees 99.9% up time ensuring your content stays protected, consistently accessible, and uninterrupted at all times.",
  },
  {
    icon: <QrCodeIcon className="sm:size-10 text-white" strokeWidth={1.5} />,
    bg_gradient_classNames: "bg-linear-to-b from-neon-pink to-purple-daffodil",
    title: "QR Codes Included",
    description:
      "Every shortened URL is automatically paired with a high-resolution QR code, making it effortless to share content across mobile devices and ensuring seamless access for users on the go.",
  },
  {
    icon: (
      <ChartColumnIcon className="sm:size-10 text-white" strokeWidth={1.5} />
    ),
    bg_gradient_classNames: "bg-linear-to-b from-goldenrod to-strawberry",
    title: "Analytics & Tracking",
    description:
      "Monitor clicks, geographic location data, and referrer sources in real time to gain deeper insights into your audience's behavior, preferences, and engagement patterns.",
  },
];

const LandingFeaturesSection = () => {
  return (
    <section className="container px-2.5 sm:px-5 mx-auto mt-[100px] max-sm:mt-20">
      <div className="w-full flex flex-col items-center gap-5 mb-16">
        <h1 className="text-6xl max-md:text-5xl max-sm:text-4xl text-center text-copy font-bold">
          Everything you need to manage your links
        </h1>
        <p className="text-copy-light text-center text-2xl max-md:text-xl max-sm:text-base">
          Powerful features designed to help you create, manage, and track your
          shortened URLs effectively.
        </p>
      </div>
      {/* Have to fix this grid because in mobile view the feature cards are overflowing. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features?.map((feature, index) => (
          <Card key={index} className="py-5 rounded-4xl gap-5 max-sm:gap-3 bg-background/10 backdrop-blur-[1px] dark:backdrop-blur-[1.5px] border-border/30">
            <CardHeader className="flex flex-col gap-5 max-sm:gap-3">
              <div
                className={`size-[60px] max-sm:size-10 rounded-3xl max-sm:rounded-2xl shrink-0 flex items-center justify-center ${feature?.bg_gradient_classNames}`}
              >
                {feature?.icon}
              </div>
              <span className="text-3xl max-md:text-2xl max-sm:text-xl font-medium text-copy">
                {feature?.title}
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-copy-light text-xl max-md:text-lg max-sm:text-base">
                {feature?.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LandingFeaturesSection;
