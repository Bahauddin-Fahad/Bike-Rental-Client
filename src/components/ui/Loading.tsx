import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="sweet-loading h-[calc(100vh-200px)] flex justify-center items-center inset-0 z-50 backdrop-blur-sm">
      <FadeLoader color="#FFFFFF" />
    </div>
  );
};

export default Loading;
