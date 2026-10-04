import React from "react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("registrationForm").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero">
      <h1>🎉 Welcome to EventEase 🎯</h1>
      <p>Register for exciting Workshops, Seminars & Conferences today!</p>
      <button onClick={scrollToForm}>Register Now 🚀</button>
    </div>
  );
};

export default Hero;
