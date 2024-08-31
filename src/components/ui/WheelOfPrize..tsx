import { useState } from "react";
import "./wheelOfPrize.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAppDispatch } from "../../redux/hooks";
import { setCoupon } from "../../redux/features/rental/rentalSlice";
import { TCoupon } from "../../types";
import { useGetAllCouponsQuery } from "../../redux/features/coupon/couponApi";

const WheelOfPrize = () => {
  const [copied, setCopied] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<TCoupon | null>(null);
  const dispatch = useAppDispatch();
  const { data } = useGetAllCouponsQuery({});

  const coupons: TCoupon[] = data?.data?.result || [];

  const spinWheel = () => {
    if (isSpinning || coupons.length === 0) return;

    setIsSpinning(true);
    const randomRotation =
      Math.floor(Math.random() * (360 * coupons?.length)) + 360; // Randomly rotate between 1 to coupon length full spins
    setRotation(randomRotation);

    const selectedCouponIndex = Math.floor(
      (randomRotation % 360) / (360 / coupons.length)
    );

    const selected = coupons[selectedCouponIndex];
    setSelectedCoupon(selected);
    dispatch(setCoupon(selected));

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${isSpinning ? "spinning" : ""}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {coupons.map((coupon, index) => {
          const segmentAngle = 360 / coupons.length; // Calculate the angle for each segment
          const segmentStyle = {
            transform: `rotate(${index * segmentAngle}deg) skewY(-${
              90 - segmentAngle
            }deg)`,
            backgroundColor: `hsl(${(index * 360) / coupons.length}, 70%, 60%)`,
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
          };

          return (
            <div key={index} className="segment" style={segmentStyle}>
              <span
                style={{
                  transform: `skewY(${90 - segmentAngle}deg) rotate(${
                    segmentAngle / 2
                  }deg)`,
                }}
              >
                {coupon.discount}%
              </span>
            </div>
          );
        })}
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning || copied}
        className="btn btn-accent spin-button"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>
      {selectedCoupon && !isSpinning && (
        <div className="text-primary dark:text-secondary font-vietnam-bold text-base lg:text-2xl space-y-5 mt-5 flex flex-col justify-center text-center">
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
                  className="input input-bordered w-full lg:w-6/12 text-black text-sm font-semibold text-center cursor-pointer"
                />
              </CopyToClipboard>
            ) : (
              <span className="bg-primary dark:bg-secondary text-secondary dark:text-primary font-bold uppercase text-sm px-3 py-2 rounded shadow">
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
