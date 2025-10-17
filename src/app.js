import express from "express";
import YAML from "yamljs";
import path from "path";

import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errorManipulator from "./middlewares/middlewares.js";
import manipulator404 from "./middlewares/manipulator404.js";
import swaggerUi from "swagger-ui-express";

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
	console.log('Conexão com o banco feita com sucesso');
})

const swaggerDocument = YAML.load(path.resolve(process.cwd(), "swagger.yaml"));
const app = express();
app.use(express.json());
routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(manipulator404);
app.use(errorManipulator);

export default app;