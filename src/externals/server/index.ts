import express from "express";
import config from "../../config";
import userRouter from "../../modules/user/adapters/routes/user.route";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "../../infrastructure/middleware/errorHandler.middleware";

export async function bootstrap() {
  const app = express();
  const basePath = config.SERVER.BASE_PATH;

  app.disable("x-powered-by");
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(errorHandler);

  app.use(`${basePath}/user`, userRouter);
  app.get(`${basePath}/health_check`, (_req, res) => {
    res.status(200).json({
      message: "Server is running",
    });
  });

  app.listen(config.SERVER.PORT, () => {
    console.log(`Server is running on http://localhost:${config.SERVER.PORT}`);
  });
}
