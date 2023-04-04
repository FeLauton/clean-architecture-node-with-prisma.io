export const productByCodePath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ["Product"],
    summary:
      "API para retornar produto e os componentes de sua estrutura através do código do produto.",
    description:
      "Essa rota pode ser executada por **qualquer usuário autenticado**",
    parameters: [
      {
        name: "code",
        in: "path",
        description: "Código do produto.",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "priceTable",
        in: "path",
        description: "Tabela de preço",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "offset",
        in: "query",
        description: "Marcador de ponto de partida da busca",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "limit",
        in: "query",
        description:
          "Quantidade de componentes retornados na busca, máximo: 100",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
                components: { type: "object" },
                nextPage: {
                  type: "boolean",
                },
                totalComponents: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const productBySerialNumberPath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ["Product"],
    summary:
      "API para retornar produto e os componentes de sua estrutura através do numero de série de um equipamento.",
    description:
      "Essa rota pode ser executada por **qualquer usuário autenticado**",
    parameters: [
      {
        name: "serialNumber",
        in: "path",
        description: "Número de série do equipamento.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
                components: { type: "object" },
                nextPage: {
                  type: "boolean",
                },
                totalComponents: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  },
};
