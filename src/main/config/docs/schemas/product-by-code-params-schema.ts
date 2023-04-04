export const productByCodeParamsSchema = {
  type: "object",
  properties: {
    code: {
      type: "string",
    },
    priceTable: {
      type: "string",
    },
  },
  required: ["code", "priceTable"],
};
