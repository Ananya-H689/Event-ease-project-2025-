import React from "react";
import Hero from "./components/Hero";
import RegistrationForm from "./components/RegistrationForm";
import "./App.css";

function App() {
  return (
    <>
      <Hero />
      <RegistrationForm />
      <footer>
        ✉️ Contact: eventease@gmail.com | 🌐 EventEase © 2025
      </footer>
    </>
  );
}

export default App;
