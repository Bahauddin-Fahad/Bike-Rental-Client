/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { usePayBookingCostMutation } from "../../redux/features/booking/bookingApi";
import { TErrorResponse } from "../../types";

const PayBookingModal = ({ bookingToPay, setBookingToPay }: any) => {
  const [payBooking] = usePayBookingCostMutation();
  console.log(bookingToPay);

  const handlePayBooking = async (id: string) => {
    try {
      const response = await payBooking(id).unwrap();

      if (response?.statusCode === 200) {
        toast.success(response?.message, { duration: 3000 });
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.log(error);
      toast.error((error as TErrorResponse)?.data?.message);
    }
  };

  return (
    <div>
      <input type="checkbox" id="pay-booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-lg !important space-y-6">
          <h3 className="font-bold text-lg xl:text-xl text-center text-primary">{`Would You Like to Pay for ${bookingToPay?.bike?.name}?`}</h3>
          <div className="flex gap-2 justify-end">
            <input
              type="button"
              value="Pay"
              onClick={() => {
                handlePayBooking(bookingToPay?._id);
              }}
              className="btn btn-md btn-accent font-bold"
            />
            <label
              onClick={() => {
                setBookingToPay(null);
              }}
              htmlFor="pay-booking-modal"
              className="btn btn-md font-bold"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayBookingModal;
