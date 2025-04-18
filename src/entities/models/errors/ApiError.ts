import {
    ContentfulStatusCode
} from "hono/http-status";

export class ApiError extends Error {
    statusCode: ContentfulStatusCode

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}