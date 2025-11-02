import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CircleSmallIcon } from "lucide-react";

const tech_used_list = [
  { icon_src: "/assets/icons/react_js_icon.svg", label: "React JS" },
  { icon_src: "/assets/icons/redux_toolkit_icon.svg", label: "Redux Toolkit" },
  { icon_src: "/assets/icons/tailwind_css_icon.svg", label: "Tailwind CSS" },
  { icon_src: "/assets/icons/shad_cn_ui_icon.svg", label: "ShadCN UI" },
  { icon_src: "/assets/icons/supabase_icon.svg", label: "Supabase" },
];

const project_points = [
  "Frontend Development",
  "Responsive Design",
  "Modern UI/UX",
  "Component Architecture",
];

const developer_points = [
  "Built as a portfolio project",
  "Showcasing modern web development skills",
];

const LandingFooter = () => {
  return (
    <footer className="mt-[100px] max-sm:mt-20 bg-mirage-black">
      <section className="container px-5 py-[60px] max-sm:px-2.5 max-sm:py-10 mx-auto grid grid-cols-2 gap-5 max-md:grid-cols-1 border-b border-[#353c4a]">
        <div className="flex flex-col gap-5 max-w-[580px]">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/icons/picotie_logo.svg"
              alt="Picotie Logo"
              className="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-2xl sm:rounded-3xl"
            />
            <h2 className="text-[#f2f2f2] text-xl sm:text-3xl font-medium">
              Picotie
            </h2>
          </div>

          <p className="text-copy-negative-light sm:text-xl text-lg">
            A modern URL shortener built with React JS, ShadCN UI, and Supabase
            backend. Features Redux state management, QR code generation, and
            responsive design.
          </p>

          <ul className="flex items-center gap-2.5 flex-wrap text-copy-negative">
            {tech_used_list?.map((tech, index) => (
              <li key={index}>
                <Badge className="h-8 sm:h-10 sm:px-4 rounded-full text-xs sm:text-sm bg-[#171F2C] border border-[#353c4a]">
                  <img src={tech?.icon_src} className="size-5 sm:size-6" />
                  <span>{tech?.label}</span>
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-5">
          <div className="flex flex-col gap-2.5 sm:gap-5">
            <h4 className="text-[#f2f2f2] text-xl sm:text-2xl font-medium">
              Project
            </h4>
            <ul className="flex flex-col gap-1.5 sm:gap-2.5">
              {project_points?.map((point, index) => (
                <li key={index}>
                  <p className="text-copy-negative-light text-lg sm:text-xl">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-5">
            <h4 className="text-[#f2f2f2] text-xl sm:text-2xl font-medium">
              Developer
            </h4>
            <ul className="flex flex-col gap-1.5 sm:gap-2.5">
              {developer_points?.map((point, index) => (
                <li key={index}>
                  <p className="text-copy-negative-light text-lg sm:text-xl">
                    {point}
                  </p>
                </li>
              ))}
              <li>
                <Button
                  type="button"
                  className="h-10 rounded-2xl bg-[#000000] hover:bg-[#101010]"
                  onClick={() =>
                    window.open(
                      "https://github.com/Krupesh17/Picotie_URL_Shortner_V1.0",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <img
                    src={"/assets/icons/github_icon.svg"}
                    className="size-5 sm:size-6"
                  />
                  View on GitHub
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container p-5 max-sm:p-2.5 mx-auto flex items-center justify-between flex-wrap gap-5">
        <div className="font-light">
          <h6 className="text-copy-negative text-base mb-2.5">
            © 2024 LinkShort Pro. Built with React JS, Redux Toolkit & Supabase.
          </h6>
          <p className="text-copy-negative-light text-sm">
            Designed and developed as a portfolio project showcasing modern
            frontend development skills.
          </p>
        </div>

        <div className="flex items-center gap-5 font-light text-copy-negative">
          <div className="flex items-center gap-2">
            <CircleSmallIcon className="text-green-500 fill-green-500 size-4 animate-pulse" />
            <span>Live Demo</span>
          </div>
          <p>v1.0.0</p>
        </div>
      </section>
    </footer>
  );
};

export default LandingFooter;
