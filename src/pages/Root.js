import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import loadingSpinner from "../images/transparent-spinner.gif";

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && (
          <div className="img-box">
            <img src={loadingSpinner} alt="Loading Spinner" />
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
