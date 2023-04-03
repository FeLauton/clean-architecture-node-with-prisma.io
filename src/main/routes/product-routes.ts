import { Router } from "express";
import { adaptRoute } from "main/adapters/express-route-adapter";
import {
  makeProductByCodeController,
  makeProductBySerialNumberController,
} from "main/factories/controllers";
import { auth } from "main/middlewares";

export default (router: Router): void => {
  router.get(
    "/product_by_code/:code/:table/",
    auth,
    adaptRoute(makeProductByCodeController())
  );
  router.get(
    "/product_by_serial_number/:serialNumber/:table/",
    auth,
    adaptRoute(makeProductBySerialNumberController())
  );
};
