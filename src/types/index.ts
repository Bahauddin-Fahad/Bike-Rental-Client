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
export type TBooking = {
  _id: string;
  user: TLoadedUser;
  bike: TBike;
  startTime: string;
  returnTime: string;
  totalCost: number;
  status: string;
  transactionId: string;
};

export type TResponse<T> = {
  data?: T;
  statusCode: number;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

// type for return value of handle error functions
export type TErrorResponse = {
  statusCode: number;
  data: {
    success: boolean;
    message: string;
    errorSources: TErrorSources;
  };
};
