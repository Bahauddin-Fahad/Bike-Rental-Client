import { FaTrophy } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import {
  getachievementsList,
  getJourneyMilestones,
} from "../../assets/jsons/journeyAndAchievements";

const JourneyAchievements = () => {
  const journeyMilestones = getJourneyMilestones();
  const achievementsList = getachievementsList();

  return (
    <div className="space-y-5">
      <div className="max-w-xl mx-auto">
        <h1 className="font-vietnam-bold text-primary dark:text-secondary text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight ">
          Our <span className="text-accent">Journey</span> &{" "}
          <span className="text-accent">Achievements</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 justify-center gap-5 lg:gap-0">
        <div className="rounded-xl shadow mx-5 p-5 bg-secondary dark:bg-primary">
          <h2 className="text-2xl font-vietnam-bold text-accent mb-5 text-center">
            Our Journey
          </h2>
          <div className="flex flex-col gap-5">
            {journeyMilestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-2 lg:gap-3 items-center bg-white dark:bg-secondary p-3 rounded-lg"
              >
                <FaCheckCircle className="size-5 lg:size-6 text-accent" />
                <div className="flex flex-col">
                  <h3 className="text-sm lg:text-xl text-[#2E603C] font-vietnam">
                    {milestone.year}
                  </h3>
                  <p className="text-xs lg:text-sm text-black font-satoshi">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl shadow mx-5 p-5 bg-secondary dark:bg-primary">
          <h2 className="text-2xl font-vietnam-bold text-accent mb-5 text-center">
            Our Achievements
          </h2>
          <div className="flex flex-col gap-5">
            {achievementsList.map((achievement, index) => (
              <div
                key={index}
                className="flex gap-2 lg:gap-3 items-center bg-white dark:bg-secondary p-3 rounded-lg"
              >
                <FaTrophy className="size-5 lg:size-6 text-accent" />
                <div className="flex flex-col">
                  <h3 className="text-sm lg:text-xl text-[#2E603C] font-vietnam">
                    {achievement.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-black font-satoshi">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyAchievements;
