import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "📚 Books & Authors API",
    version: "1.0.0",
    description: "Documentação interativa da API de Livros e Autores 🚀",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Caminho para suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;