import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/test.route.js"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'EWHAIAN 2025 MAY MD-SITE API SERVER',
      version: '1.0.0',
      description: '이 문서는 이화이언 5월 행사 사이트 re:market api 문서입니다.😎 굿즈 판매 폼을 개발 목적으로 하고 있습니다.',
    },
    servers: [
      {
        url: "http://localhost:5000"
      },
    ],
  },
  apis: ['./controllers/*.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // 여기 수정됨!
app.use("/api/test", testRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
