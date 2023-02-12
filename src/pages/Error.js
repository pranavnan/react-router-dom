import React from "react";
import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";

function Error() {
  return (
    <main className={classes.content}>
      <MainNavigation />
      <h1>An ereror occured</h1>
      <p>Could not find this page</p>
    </main>
  );
}

export default Error;
