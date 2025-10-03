import React, { useEffect } from "react";
import { DashboardHeader } from "@/components";
import { Outlet } from "react-router-dom";
import supabase from "@/utils/supabase";
import { useDispatch, useSelector } from "react-redux";
import { updateClicksData } from "@/redux/slices/dashboard_slice";

const DashboardLayout = () => {
  const { clicks } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set up Supabase realtime subscription
    const channel = supabase
      .channel("clicks_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clicks" },
        async (payload) => {
          try {
            if (payload.eventType === "INSERT") {
              const updatedClicks = [...clicks];
              updatedClicks?.push(payload.new);

              dispatch(updateClicksData(updatedClicks));
            }
            
            if (payload.eventType === "DELETE") {
              const updatedClicks = await clicks?.filter(
                (item) => item?.id !== payload.old?.id
              );

              dispatch(updateClicksData(updatedClicks));
            }
          } catch (error) {
            console.error(error?.message);
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative min-h-dvh w-full bg-background">
      <DashboardHeader />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
