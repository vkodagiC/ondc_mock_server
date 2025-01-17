import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cron from "node-cron"; // Import node-cron

import {
	authRouter,
	b2bRouter,
	miscRouter,
	servicesRouter,
	logisticsRouter,
} from "./controllers";
import cors from "cors";
import {
	authSwagger,
	b2bSwagger,
	b2cSwagger,
	miscSwagger,
	requestParser,
	servicesSwagger,
	agriServiceSwagger,
	globalErrorHandler,
	errorHandlingWrapper,
	healthcareServiceSwagger,
} from "./middlewares";
import { b2cRouter } from "./controllers/b2c";

// import memwatch from 'memwatch-next';

// // Set up memwatch to listen for memory leaks
// memwatch.on('leak', (info) => {
//   console.log('Memory leak detected:', info);
// });


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api-docs/auth", swaggerUi.serve, authSwagger("/api-docs/auth"));
app.use("/api-docs/misc", swaggerUi.serve, miscSwagger("/api-docs/misc"));
app.use("/api-docs/b2b", swaggerUi.serve, b2bSwagger("/api-docs/b2b"));
app.use("/api-docs/b2c", swaggerUi.serve, b2cSwagger("/api-docs/b2c"));

app.use(
	"/api-docs/services",
	swaggerUi.serve,
	servicesSwagger("/api-docs/services")
);

app.use(
	"/api-docs/agri-services",
	swaggerUi.serve,
	agriServiceSwagger("/api-docs/agri-services")
);

app.use(
	"/api-docs/healthcare-services",
	swaggerUi.serve,
	healthcareServiceSwagger("/api-docs/healthcare-services")
);

app.use(
	"/api-docs/healthcare-services",
	swaggerUi.serve,
	healthcareServiceSwagger("/api-docs/agri-equipment-services")
);

app.use(express.json());
app.use(express.raw({ type: "*/*", limit: "1mb" }));
app.use(requestParser);
app.use("/", miscRouter);
app.use("/b2b", errorHandlingWrapper(b2bRouter));
app.use("/b2c", errorHandlingWrapper(b2cRouter));
app.use("/auth", errorHandlingWrapper(authRouter));
app.use("/services", errorHandlingWrapper(servicesRouter));
app.use("/logistics", errorHandlingWrapper(logisticsRouter));
app.use("/detect_app_installation", (req: Request, res: Response) => {
	const headers = req.headers;
	return res.json({
		headers: headers,
	});
});
app.use(globalErrorHandler);

// //Schedule the function to run every 30 seconds using node-cron
// cron.schedule("*/30 * * * * *", async () => {
// 	try {
// 		await sendUpsolicieatedOnStatus();
// 	} catch (error) {
// 		console.log("error occured in cron");
// 	}
// });

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app