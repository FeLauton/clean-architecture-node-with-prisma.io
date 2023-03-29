import components from "./components";
import paths from "./paths";
import schemas from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "Clean-architecture-with-prisma.io",
    description: "Clean architecture with prisma.io using SOLID concepts",
    version: "1.0.0",
    contact: {
      name: "Fellipe Lauton",
      email: "lipe_lauton@gmail.com",
      url: "https://www.linkedin.com/in/fellipe-lauton/",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Servidor Principal",
    },
  ],
  tags: [
    {
      name: "Login",
      description: "APIs relacionadas a Login",
    },
  ],
  paths,
  schemas,
  components,
};
