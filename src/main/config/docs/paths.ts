import {
  loginPath,
  productByCodePath,
  productBySerialNumberPath,
  signUpPath,
} from "./paths/";

export default {
  "/login": loginPath,
  "/signup": signUpPath,
  "/product_by_code/{code}/{priceTable}/": productByCodePath,
  "/product_by_serial_number/{serialNumber}/{priceTable}/":
    productBySerialNumberPath,
};
