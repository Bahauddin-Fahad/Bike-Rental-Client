import { useParams } from "react-router-dom";
import { useEffect } from "react";

// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { toast } from "react-toastify";
import { TBike } from "../../types";
import { useGetSingleBikeQuery } from "../../redux/features/bikeApi";

const BikeDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { id } = useParams();
  const { data } = useGetSingleBikeQuery(id);
  const bikeDetails: TBike = data?.data;

  //   const dispatch = useAppDispatch();

  //   const { products } = useAppSelector((state) => state.products);

  //   const handleAddToCart = () => {
  //     const existingProduct = products.find(
  //       (product) => product.id === bikeDetails?._id
  //     );

  //     if (existingProduct) {
  //       // Product already exists in the cart
  //       toast.error("This product is already in your cart.", {
  //         theme: "colored",
  //       });
  //     } else {
  //       // Product does not exist in the cart, proceed with dispatching
  //       const productInfo = {
  //         id: bikeDetails?._id,
  //         name: bikeDetails?.name,
  //         price: bikeDetails?.price,
  //         quantity,
  //         image: bikeDetails?.image,
  //         inStock,
  //       };

  //       dispatch(addProduct(productInfo));
  //       toast.success("Product added to cart successfully.", {
  //         theme: "colored",
  //       });
  //     }
  //   };
  return (
    <div className="custom-padding mx-auto my-10">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide dark:text-[#bdbdbd9e]">
            {bikeDetails?.name.split(" ")[0]}
          </span>
          <span className="text-accent">
            {bikeDetails?.name.split(" ").slice(1).join(" ")}
          </span>
        </p>
      </div>
      <div className="card shadow-xl mt-6 bg-secondary dark:bg-primary p-10 space-y-10">
        <div className="relative glass bg-[#272727]">
          <div className="max-w-xl mx-auto h-[200px] sm:h-[250px] md:h-[365px] cursor-pointer">
            {/* <PhotoProvider>
              <PhotoView src={bikeDetails?.image}> */}
            <img
              src={bikeDetails?.image}
              alt="Post"
              className="h-[200px] sm:h-[250px] md:h-[365px] mx-auto object-contain xs:object-cover"
            />
            {/* </PhotoView>
            </PhotoProvider> */}
          </div>
        </div>
        <div className="card-body p-0">
          <h2 className="text-base xs:text-2xl font-semibold">
            {bikeDetails?.name}
          </h2>
          <h2 className="text-base xs:text-2xl font-semibold">
            Price/hr: {bikeDetails?.pricePerHour} ৳
          </h2>
          <div>
            <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
              Description
            </span>
            <p className="text-xs xs:text-base sm:text-xl">
              {bikeDetails?.description}
            </p>
          </div>
          <div className="flex justify-between mt-10">
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                CC
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.cc}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Year
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.year}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Model
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.model}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Brand
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.brand}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Available
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.isAvailable.toString()}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* <div className="flex items-center gap-3">
              <div className="grow">
                <h1 className="text-left text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                  Select quantity
                </h1>
              </div>
              <QuantitySelector
                quantity={quantity}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                inStock={inStock}
              />
            </div> */}
            {/* <div className="card-actions justify-end items-end">
              <button
                // onClick={handleAddToCart}
                className={`h-[30px] w-[100px] xs:h-[50px] xs:w-[177px] rounded-lg xs:rounded-xl text-sm xs:text-lg font-semibold text-black ${
                  inStock && quantity
                    ? "bg-accent hover:scale-110 duration-500"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
                // disabled={productDetails?.stockQuantity <= 0 ? true : false}
                disabled={isDisabled ? true : false}
              >
                {bikeDetails?.stockQuantity ? "Add to Cart" : "Sold Out"}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
