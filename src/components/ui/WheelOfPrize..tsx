import { useState } from "react";
import "./wheelOfPrize.css";

const WheelOfPrize = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);

  const prizes = [
    "Prize 1",
    "Prize 2",
    "Prize 3",
    "Prize 4",
    "Prize 5",
    "Prize 6",
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 720; // Randomly rotate between 2 to 4 full spins
    setRotation(randomRotation);

    const selectedPrizeIndex = Math.floor(
      (randomRotation % 360) / (360 / prizes.length)
    );
    setSelectedPrize(prizes[selectedPrizeIndex]);

    // Reset the spinning state after the animation duration
    setTimeout(() => {
      setIsSpinning(false);
    }, 4000); // 4 seconds (same duration as the CSS animation)
  };

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${isSpinning ? "spinning" : ""}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {prizes.map((prize, index) => (
          <div key={index} className="segment">
            <span>{prize}</span>
          </div>
        ))}
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="btn btn-accent"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>
      {selectedPrize && !isSpinning && (
        <div className="text-primary dark:text-secondary font-vietnam-bold text-2xl ">
          You won: {selectedPrize}!
        </div>
      )}
    </div>
  );
};

export default WheelOfPrize;
