import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import {
  ChangePassword,
  Landing,
  Link,
  RedirectLink,
  VerifyEmailChange,
} from "./pages";
import { PrivateRoute, PublicRoute } from "./components";
import Dashboard from "./pages/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import supabase from "./utils/supabase";
import {
  clearAuthData,
  fetchUserSession,
  setInitialized,
} from "./redux/slices/auth_slice";
import { LoaderIcon } from "lucide-react";
import { DashboardLayout } from "./layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [{ index: true, element: <Landing /> }],
  },

  // { path: "/", element: <Landing /> },
  { path: "/:url_slug", element: <RedirectLink /> },
  {
    path: "/verify-email-change",
    element: <VerifyEmailChange />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "link/:id",
            element: <Link />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const { user, isInitialized } = useSelector((state) => state.auth);
  const authListenerRef = useRef(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          dispatch(fetchUserSession());
        } else {
          dispatch(setInitialized());
        }
      } catch (error) {
        console.error(error?.message);
        dispatch(setInitialized());
      }
    };

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      checkSession();
    }

    if (!authListenerRef.current) {
      authListenerRef.current = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            if (session && !user) {
              dispatch(fetchUserSession());
            }
          }

          if (event === "USER_UPDATED") {
            dispatch(fetchUserSession());
          }

          if (event === "SIGNED_OUT" || !session) {
            dispatch(clearAuthData());
          }
        }
      );
    }

    return () => {
      if (authListenerRef.current) {
        authListenerRef.current.data.subscription.unsubscribe();
        authListenerRef.current = null;
      }
    };
  }, [dispatch, user]);

  if (!isInitialized) {
    return (
      <section className="h-dvh bg-background flex items-center justify-center">
        <LoaderIcon className="animate-spin text-copy size-5" />
      </section>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
