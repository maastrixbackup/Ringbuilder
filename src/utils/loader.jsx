import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ isLoading }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true); // Show loader immediately
    } else {
      // Delay hiding to allow fade-out
      const timer = setTimeout(() => setIsVisible(false), 300); // Match CSS transition time
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className={`loader-overlay ${isVisible ? "active" : ""}`}>
      <div className="loader">
        {[...Array(5)].map((_, i) => (
          <span key={i} />
        ))}
        <div className="loader-text">...</div>
      </div>
    </div>
  );
}