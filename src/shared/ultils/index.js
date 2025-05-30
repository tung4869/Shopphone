import { BASE_URL } from "../constants/app";

export const getImage = (imageName) => {
  return `${BASE_URL}/assets/uploads/products/${imageName}`;
};

export const getImageSlider = (imageName) => {
  return `${BASE_URL}/assets/uploads/sliders/${imageName}`;
};
export const getImageBanner = (imageName) => {
  return `${BASE_URL}/assets/uploads/banners/${imageName}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
