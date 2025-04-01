import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/test.route.js"
import loginRoutes from "./routes/login.route.js"
import ordercheckRoutes from "./routes/ordercheck.route.js"
import orderedRoutes from "./routes/ordered.route.js"
import orderadminRoutes from "./routes/orderadmin.route.js"
import shoppingCartRoutes from "./routes/shoppingcart.route.js"
import productRoutes from "./routes/product.route.js"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./lib/db.js";
import session from "express-session";

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 *24, // 24시간 동안 유지
    }
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
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', // 세션 쿠키 이름 (기본값이 connect.sid)
          description: '세션 기반 인증'
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:5000"
      },
    ],
  },
  apis: ['./controllers/*.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); 
app.use("/api", shoppingCartRoutes);
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/ordercheck", ordercheckRoutes);
app.use("/api/ordered", orderedRoutes);
app.use('/api/orderadmin', orderadminRoutes);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
