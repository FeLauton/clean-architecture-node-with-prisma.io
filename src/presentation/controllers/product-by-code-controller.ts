import { LoadProductByCode } from "domain/usecases";
import { noContent, ok, serverError } from "presentation/helpers";
import { Controller, HttpRequest, HttpResponse } from "presentation/protocols";

export class ProductByCodeController implements Controller {
  constructor(private readonly loadProduct: LoadProductByCode) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code, priceTable } = httpRequest.params;
      const { offset, limit } = httpRequest.query;
      const product = await this.loadProduct.loadByCode(
        code,
        priceTable,
        Number(offset),
        Number(limit)
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
