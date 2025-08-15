import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 text-center">
      <p>
        &copy; {new Date().getFullYear()} Luxury Rings. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
