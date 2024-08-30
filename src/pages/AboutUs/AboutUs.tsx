import Staffs from "./Staffs";
import "./aboutUs.css";
import Contact from "./Contact";
import Header from "./Header";
import Missions from "./Missions";
import JourneyAchievements from "./JourneyAchievements";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  return (
    <div className="max-w-xs xl:max-w-6xl px-2 mx-auto space-y-20 my-10">
      <Header />
      <Missions />
      <Staffs />
      <Contact />
      <JourneyAchievements />
    </div>
  );
};

export default AboutUs;
