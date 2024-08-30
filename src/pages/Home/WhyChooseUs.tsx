import {
  FaMotorcycle,
  FaShieldAlt,
  FaThumbsUp,
  FaLeaf,
  FaUserFriends,
  FaWrench,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const sellingPoints = [
    {
      icon: <FaMotorcycle />,
      title: "Top-Quality Bikes",
      description:
        "We offer a fleet of premium, well-maintained bikes suitable for every type of rider.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safety First",
      description:
        "All our bikes undergo rigorous safety checks to ensure a secure and worry-free ride.",
    },
    {
      icon: <FaThumbsUp />,
      title: "Customer Satisfaction",
      description:
        "Our commitment to customer service ensures a smooth and enjoyable experience every time.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly Options",
      description:
        "Choose from a range of electric and eco-friendly bikes that reduce your carbon footprint.",
    },
    {
      icon: <FaUserFriends />,
      title: "Community Driven",
      description:
        "We foster a sense of community among riders, offering support and shared experiences.",
    },
    {
      icon: <FaWrench />,
      title: "Expert Maintenance",
      description:
        "Our team of experts ensures that every bike is in top condition, ready for your adventure.",
    },
  ];
  return (
    <div className="custom-padding flex flex-col space-y-5 lg:space-y-10  text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="font-vietnam-bold text-[#2E603C] text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight ">
          Why <span className="text-accent">Choose</span> Us
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {sellingPoints.map((point, index) => (
          <div
            key={index}
            className="rounded-xl shadow p-5 w-[250px] transition-transform duration-300 ease-in-out hover:translate-y-[-5px] bg-secondary dark:bg-primary space-y-4"
          >
            <div className="text-[40px] text-accent">{point.icon}</div>
            <h3 className="text-xl">{point.title}</h3>
            <p className="text-sm">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
