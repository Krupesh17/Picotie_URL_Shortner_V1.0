import React from "react";
import { LoaderIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, isLoading } = useSelector((state) => state?.auth);

  if (isLoading) {
    return (
      <section className="h-dvh bg-background flex items-center justify-center">
        <LoaderIcon className="animate-spin text-copy size-5" />
      </section>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
