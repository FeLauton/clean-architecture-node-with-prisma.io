import {
  LoadProductByCodeRepository,
  LoadProductBySerialNumberRepository,
} from "data/protocols/db";
import { Product } from "src/domain/models";

const mockProduct = (): Product => ({
  code: "any_product_code",
  description: "any_product_description",
  price: 58,
  components: [
    {
      code: "any_component_code",
      description: "any_component_description",
      amount: 1,
      components: [
        {
          code: "any_sub_component_code",
          description: "any_sub_component_description",
          amount: 3,
        },
        {
          code: "another_sub_component_code",
          description: "another_sub_component_description",
          amount: 12,
        },
      ],
    },
  ],
  nextPage: false,
  totalComponents: 1,
});

export const mockLoadProductByCodeRepository =
  (): LoadProductByCodeRepository => {
    class LoadProductByCodeRepositoryStub
      implements LoadProductByCodeRepository
    {
      async loadByCode(
        code: string,
        table: string,
        offset?: number,
        limit?: number
      ): Promise<Product> {
        {
          return Promise.resolve(mockProduct());
        }
      }
    }
    return new LoadProductByCodeRepositoryStub();
  };

export const mockLoadProductBySerialNumberRepository =
  (): LoadProductBySerialNumberRepository => {
    class LoadProductBySerialNumberRepositoryStub
      implements LoadProductBySerialNumberRepository
    {
      async loadBySerialNumber(
        code: string,
        table: string,
        offset?: number,
        limit?: number
      ): Promise<Product> {
        {
          return Promise.resolve(mockProduct());
        }
      }
    }
    return new LoadProductBySerialNumberRepositoryStub();
  };
