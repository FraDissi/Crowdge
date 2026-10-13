import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./Landing";
import Platform from "./Platform";
import "./styles.css";
function Scroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(
        () =>
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    } else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
function Root() {
  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app/*" element={<Platform />} />
        <Route
          path="*"
          element={
            <div className="not-found">
              <h1>A little off the beaten path.</h1>
              <p>This page doesn’t exist.</p>
              <a className="button primary" href="/">
                Back to Crowdge
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
