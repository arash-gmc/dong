import React from "react";
import "../styles/header.css";

const SiteHeader = () => {
  return (
    <div>
      <div className="d-none d-md-block header">
        <div className="header-logo">
          <img
            src="./new-logo.png"
            alt="siteLogo"
          ></img>
        </div>
        <div className="header-text">
          <h2>دنگ آنلاین</h2>
          <p>محاسبه ی آنلاین دنگ سفر</p>
        </div>
      </div>

      <div className="d-md-none header-md mb-2">
        <img
          src="./new-logo.png"
          alt="site logo"
        ></img>
        <h4>دنگ آنلاین</h4>
      </div>
    </div>
  );
};

export default SiteHeader;
