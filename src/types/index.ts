/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Control, FieldValues } from "react-hook-form";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

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
export type TLoadedUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type TResponse<T> = {
  data?: T;
  statusCode: number;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
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
