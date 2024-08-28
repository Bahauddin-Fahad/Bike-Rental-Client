import {
  getachievementsList,
  getJourneyMilestones,
} from "../../assets/jsons/journeyAndAchievements";
import { FaTrophy } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const CompareBikes = () => {
  const journeyMilestones = getJourneyMilestones();
  const achievementsList = getachievementsList();

  return (
    <div className="custom-padding my-10 space-y-5">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <h1 className="font-vietnam-bold text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight ">
          Compare your Favourite <span className="text-[#27ae60]">Bikes</span>
        </h1>
      </div>
      <div className="max-w-xl mx-auto"></div>
      <div className="grid grid-cols-1 xl:grid-cols-2 justify-center">
        <div className="rounded-xl shadow mx-5 p-5 bg-secondary dark:bg-primary">
          <label htmlFor="bike-modal">
            <h2 className="text-2xl font-vietnam-bold text-[#27ae60] mb-5 text-center cursor-pointer">
              Pick First Bike
            </h2>
          </label>

          <div className="flex flex-col gap-5">
            {journeyMilestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-3 items-center bg-white dark:bg-secondary p-3 rounded-lg"
              >
                <FaCheckCircle className="text-2xl text-[#27ae60]" />
                <div className="flex flex-col">
                  <h3 className="text-sm xl:text-xl text-accent font-vietnam">
                    {milestone.year}
                  </h3>
                  <p className="text-xs xl:text-sm text-black font-satoshi">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl shadow mx-5 p-5 bg-secondary dark:bg-primary">
          <h2 className="text-2xl font-vietnam-bold text-[#27ae60] mb-5 text-center">
            Pick Second Bike
          </h2>
          <div className="flex flex-col gap-5">
            {achievementsList.map((achievement, index) => (
              <div
                key={index}
                className="flex gap-3 items-center bg-white dark:bg-secondary p-3 rounded-lg"
              >
                <FaTrophy className="text-2xl text-[#27ae60]" />
                <div className="flex flex-col">
                  <h3 className="text-sm xl:text-xl text-accent font-vietnam">
                    {achievement.title}
                  </h3>
                  <p className="text-xs xl:text-sm text-black font-satoshi">
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

export default CompareBikes;
