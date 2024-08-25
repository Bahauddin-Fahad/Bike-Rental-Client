/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Control, FieldValues } from "react-hook-form";

export type TBanner = {
  name: string;
  bannerImage: string;
};

export type TBike = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image: string;
  isAvailable: boolean;
};

// export type RatingProps = {
//   initialRating?: number;
//   onChange?: (rate: number) => void;
//   readonly?: boolean;
//   emptySymbol?: React.ReactNode | string;
//   fullSymbol?: React.ReactNode | string;
// };

// export type RatingInputProps = {
//   name: string;
//   control?: Control<FieldValues>;
//   defaultValue?: number;
//   readOnly?: boolean;
// };
