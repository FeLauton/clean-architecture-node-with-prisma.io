import { Product } from "domain/models";
import { UserModel } from "domain/models/user";
import {
  PrismaClient as PrismaClient1,
  users,
} from "../../../../prisma/generated/client1";
import { PrismaClient as PrismaClient2 } from "../../../../prisma/generated/client2";

export const Prisma = new PrismaClient1();
const Prisma2 = new PrismaClient2();

export const PrismaHelper = {
  getProduct: async (
    code: string,
    table: string,
    offset: number,
    limit: number
  ): Promise<Product> => {
    const result: any = await Prisma2.$queryRaw`
    SELECT
      RTRIM(SB1PROD.B1_COD) as code,
      RTRIM(SB1PROD.B1_DESC) as 'description',
      TRY_CAST(DA1PROD.DA1_PRCVEN AS FLOAT) AS price,
      (
        SELECT
          RTRIM(SB1COMPONENT.B1_COD) AS code,
          RTRIM(SB1COMPONENT.B1_DESC) AS 'description',
          NULLIF(CASE WHEN SG1COMP.G1_OBSERV = '' THEN NULL ELSE RTRIM(SG1COMP.G1_OBSERV) END, '') AS details,
          TRY_CAST(SG1COMP.G1_QUANT AS FLOAT) AS amount,
          TRY_CAST(DA1.DA1_PRCVEN AS FLOAT) AS price
          -- TRY_CAST(DA1.DA1_PRCVEN AS FLOAT) AS price,
          -- (
          --   SELECT
          --     RTRIM(SB1SUBCOMP.B1_COD) AS code,
          --     RTRIM(SB1SUBCOMP.B1_DESC) AS 'description',
          --     NULLIF(CASE WHEN SG1COMP.G1_OBSERV = '' THEN NULL ELSE RTRIM(SG1COMP.G1_OBSERV) END, '') AS details,
          --     TRY_CAST(SG1COMP.G1_QUANT AS FLOAT) AS amount,
          --     TRY_CAST(DA1.DA1_PRCVEN AS FLOAT) AS price
          --   FROM SG1010 AS SG1COMP (NOLOCK)
          --     INNER JOIN SB1010 (NOLOCK) AS SB1SUBCOMP ON SB1SUBCOMP.B1_COD = SG1COMP.G1_COMP
          --     LEFT JOIN DA1010 (NOLOCK) AS DA1 ON DA1.DA1_CODPRO = SB1SUBCOMP.B1_COD AND DA1.DA1_CODTAB = ${table} AND DA1.D_E_L_E_T_ <> '*'
          --   WHERE G1_COD IN (SB1COMPONENT.B1_COD) AND SUBSTRING(SB1SUBCOMP.B1_COD,1,1) <> 'M'
          --   ORDER BY SB1SUBCOMP.B1_COD OFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY
          --   FOR JSON PATH
          -- ) AS components
        FROM SG1010 AS SG1COMP (NOLOCK)
          INNER JOIN SB1010 (NOLOCK) AS SB1COMPONENT ON SB1COMPONENT.B1_COD = SG1COMP.G1_COMP
          LEFT JOIN DA1010 (NOLOCK) AS DA1 ON DA1.DA1_CODPRO = SB1COMPONENT.B1_COD AND DA1.DA1_CODTAB = ${table} AND DA1.D_E_L_E_T_ <> '*'
        WHERE G1_COD IN (SB1PROD.B1_COD) AND SUBSTRING(SB1COMPONENT.B1_COD,1,1) <> 'M'
        ORDER BY SB1COMPONENT.B1_COD OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
        FOR JSON PATH
      ) AS components,
      COUNT(*) AS totalComponents
    FROM SB1010 AS SB1PROD (NOLOCK)
      LEFT JOIN DA1010 (NOLOCK) AS DA1PROD ON DA1PROD.DA1_CODPRO = SB1PROD.B1_COD AND DA1PROD.DA1_CODTAB = ${table} AND DA1PROD.D_E_L_E_T_ <> '*'
    WHERE SB1PROD.B1_COD = ${code}
    GROUP BY SB1PROD.B1_COD, SB1PROD.B1_DESC, DA1PROD.DA1_PRCVEN`;
    if (result.length) {
      const product: Product = {
        code: result[0].code,
        description: result[0].description,
        price: result[0].price,
        components: JSON.parse(result[0].components),
        nextPage:
          result[0].totalComponents - (offset + limit) > 0 ? true : false,
        totalComponents: result[0].totalComponents,
      };
      return product;
    }
    return null;
  },

  getProductCodeBySerialNumber: async (
    serialNumber: string
  ): Promise<string> => {
    const productCode: any = await Prisma2.$queryRaw`
    SELECT RTRIM(AA3_CODPRO) AS code
    FROM AA3010 (NOLOCK)
    WHERE AA3_NUMSER = ${serialNumber}`;

    if (productCode.length) {
      return productCode[0].code;
    }
    return null;
  },

  userMap: (user: users): UserModel => {
    const { id, role, token, ...rest } = user;
    return { id: String(id), ...rest };
  },
};
