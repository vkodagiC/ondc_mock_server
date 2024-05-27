import { NextFunction, Response, Request } from "express";
import { createAuthHeader, redis } from "./index";
import axios, { AxiosError } from "axios";

interface headers {
	authorization: string;
	"X-Gateway-Authorization"?: string;
}

async function send_response(
	res: Response,
	next: NextFunction,
	res_obj: any,
	transaction_id: string,
	action: string,
	scenario: string = ""
) {
	try {
		const { context } = res_obj;
		const bpp_uri = context.bpp_uri || res_obj.bpp_uri;
		if (res_obj.bpp_uri) delete res_obj.bpp_uri;

		const header = await createAuthHeader(res_obj);
		await redis.set(
			`${transaction_id}-${action}-from-server`,
			JSON.stringify({ request: { ...res_obj } })
		);

		const headers: headers = {
			authorization: header,
		};
		if (action === "search") {
			headers["X-Gateway-Authorization"] = header;
		}

		console.log("ddddddddddddddddddddd",`${bpp_uri}/${action}${scenario ? `?scenario=${scenario}` : ""}`,res_obj)
		const response = await axios.post(
			`${bpp_uri}/${action}${scenario ? `?scenario=${scenario}` : ""}`,
			res_obj,
			{
				headers: { ...headers },
			}
		);

		await redis.set(
			`${transaction_id}-${action}-from-server`,
			JSON.stringify({
				request: { ...res_obj },
				response: {
					response: response.data,
					timestamp: new Date().toISOString(),
				},
			})
		);
		return res.status(200).json({
			message: {
				ack: {
					status: "ACK",
				},
			},
			transaction_id,
		});
	} catch (error) {
		// console.log("ERROR", (error as any)?.response)
		return next(error);
	}
}
function send_nack(res: Response, message: string) {
	return res.status(400).json({
		message: {
			ack: {
				status: "NACK",
			},
		},
		error: {
			message: message,
		},
	});
}
export { send_response, send_nack };
