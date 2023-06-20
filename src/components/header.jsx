import React from "react";
import "../styles/header.css";

const SiteHeader = () => {
  return (
    <div>
      <div className="d-none d-md-block larg-header">
        <img
          src="./logo.webp"
          alt="site logo"
        />

        <div className="header-text">
          <h1>دنگ آنلاین</h1>
          <h2>محاسبه ی آنلاین دنگ سفر</h2>
        </div>
      </div>

      <div className="d-md-none small-header mb-2">
        <img
          src="./logo.webp"
          alt="site logo"
        ></img>
        <h1>دنگ آنلاین</h1>
      </div>
    </div>
  );
};

export default SiteHeader;
