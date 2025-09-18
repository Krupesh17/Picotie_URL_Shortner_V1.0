import React from "react";
import { LoaderIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { user, isLoading } = useSelector((state) => state?.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <section className="h-dvh bg-background flex items-center justify-center">
        <LoaderIcon className="animate-spin text-copy size-5" />
      </section>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
