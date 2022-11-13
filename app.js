import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { sequelize } from "./db/database.js";
import authRouter from "./router/auth.js";
import postRouter from "./router/post.js";
import commentRouter from "./router/comment.js";
import { swaggerUi, specs } from "./swagger.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

sequelize.sync().then(() => {
  app.listen(8080);
});
