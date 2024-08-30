import { FadeLoader } from "react-spinners";

const Loading = () => {
  const theme = localStorage.getItem("theme");

  return (
    <div className="sweet-loading py-10 h-screen overflow-y-auto flex justify-center items-center inset-0 z-50 backdrop-blur-sm">
      <FadeLoader color={`${theme === "light" ? "#000000" : "#FFFFFF"}`} />
    </div>
  );
};

export default Loading;
