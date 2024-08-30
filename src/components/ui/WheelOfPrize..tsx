import { useState } from "react";
import "./wheelOfPrize.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAppDispatch } from "../../redux/hooks";
import { setCoupon } from "../../redux/features/booking/bookingSlice";
import { getCoupons } from "../../assets/jsons/coupon";
import { TPrize } from "../../types";

const WheelOfPrize = () => {
  const [copied, setCopied] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<TPrize | null>(null);
  const dispatch = useAppDispatch();

  const coupons: TPrize[] = getCoupons();

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomRotation = Math.floor(Math.random() * (360 * 6)) + 360; // Randomly rotate between 1 to 6 full spins
    setRotation(randomRotation);

    const selectedCouponIndex = Math.floor(
      (randomRotation % 360) / (360 / coupons.length)
    );

    setSelectedCoupon(coupons[selectedCouponIndex]);
    dispatch(setCoupon(coupons[selectedCouponIndex]));
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
        {coupons.map((prize, index) => (
          <div key={index} className="segment">
            <span>{prize.discount}%</span>
          </div>
        ))}
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning || copied}
        className="btn btn-accent spin-button"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>
      {selectedCoupon && !isSpinning && (
        <div className="text-primary dark:text-secondary font-vietnam-bold text-2xl space-y-5 mt-5 flex flex-col justify-center">
          <p>You won: {selectedCoupon.discount}% Discount! </p>
          <div className="text-center flex items-center justify-center gap-2">
            {!copied ? (
              <CopyToClipboard
                text={selectedCoupon?.code}
                onCopy={() => setCopied(true)}
              >
                <input
                  type="text"
                  readOnly
                  value={selectedCoupon?.code}
                  className="input input-bordered w-6/12 text-black text-sm font-semibold text-center cursor-pointer"
                />
              </CopyToClipboard>
            ) : (
              <span className="bg-slate-800 text-white font-bold uppercase text-sm px-3 py-2 rounded shadow">
                Copied to Clipboard
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelOfPrize;
