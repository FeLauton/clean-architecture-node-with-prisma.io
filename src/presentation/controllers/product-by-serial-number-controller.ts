import { LoadProductBySerialNumber } from "domain/usecases";
import { noContent, ok, serverError } from "presentation/helpers";
import { Controller, HttpRequest, HttpResponse } from "presentation/protocols";

export class ProductBySerialNumberController implements Controller {
  constructor(
    private readonly LoadProductBySerialNumber: LoadProductBySerialNumber
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { serialNumber } = httpRequest.params;
      const product = await this.LoadProductBySerialNumber.loadBySerialNumber(
        serialNumber
      );
      if (!product) {
        return noContent();
      }
      return ok(product);
    } catch (error) {
      return serverError(error);
    }
  }
}
