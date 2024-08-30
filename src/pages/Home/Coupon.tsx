import WheelOfPrize from "../../components/ui/WheelOfPrize.";

const Coupon = () => {
  return (
    <div className="custom-margin items-center justify-between gap-5 xl:gap-12 bg-secondary dark:bg-primary rounded-2xl xl:rounded-[40px] p-8 xl:p-[80px] shadow space-y-5 lg:space-y-10">
      <div className="max-w-xs lg:max-w-lg mx-auto">
        <h1 className="font-vietnam text-primary dark:text-secondary text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight">
          Try <span className="text-accent">Your Luck</span> and get special
          <span className="text-accent"> Discounts on Rental </span>
        </h1>
      </div>
      <div>
        <WheelOfPrize />
      </div>
    </div>
  );
};

export default Coupon;
