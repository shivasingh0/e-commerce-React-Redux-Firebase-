import React from "react";
import Navbar from "../navBar/Navbar";
import Footer from "../footer/Footer";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="context">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
