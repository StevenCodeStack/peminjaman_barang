import React from "react";
import AboutView from "./AboutView";
import HomeView from "./HomeView";
import ContactView from "./ContactView";
import Footer from "../Footer";

const HomePage = () => {
  return (
    <>
      <HomeView />
      <AboutView />
      <ContactView />
      <Footer />
    </>
  );
};

export default HomePage;
