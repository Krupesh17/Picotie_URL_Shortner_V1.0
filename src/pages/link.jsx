import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LinkAnalyticsSection, LinkOverviewSection } from "@/components";

const Link = () => {
  const { id } = useParams();
  const { shortLinks, clicks } = useSelector((state) => state.dashboard);

  const [isLoading, setLoading] = useState(false);
  const [linkData, setLinkData] = useState(null);

  const getLinkData = async () => {
    try {
      setLoading(true);
      const link = await shortLinks?.filter((item) => item?.id === id)[0];
      const link_clicks = await clicks?.filter((item) => item?.url_id === id);

      setLinkData({ ...link, clicks: link_clicks });
    } catch (error) {
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinkData();
  }, [id]);

  useEffect(() => {
    document.title = `${linkData ? linkData?.title : "Link"} - Picotie`;
  }, []);

  return isLoading ? (
    <div className="w-full">
      <section className="container px-2.5 sm:px-5 mx-auto mt-[100px] max-sm:mt-20">
        <div className="bg-accent/80 rounded-2xl w-80 h-[60px] mb-10"></div>
        <div className="bg-accent/80 rounded-3xl w-full lg:h-[403px] h-[527px] animate-pulse"></div>
      </section>

      <section className="container px-2.5 sm:px-5 mx-auto mt-20 max-sm:mt-20">
        <div className="bg-accent/80 rounded-2xl w-80 h-[60px] mb-10"></div>
        <div className="bg-accent/80 rounded-3xl w-full h-[447px] animate-pulse mb-5"></div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-10">
          <div className="bg-accent/80 rounded-3xl w-full h-[447px] animate-pulse"></div>
          <div className="bg-accent/80 rounded-3xl w-full h-[447px] animate-pulse"></div>
        </div>
      </section>
    </div>
  ) : (
    <div>
      <LinkOverviewSection shortLinkData={linkData} />
      <LinkAnalyticsSection shortLinkData={linkData} />
    </div>
  );
};

export default Link;
