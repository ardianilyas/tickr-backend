export class ForbiddenError extends Error {
    statusCode: number;

    constructor(message: string = "Forbidden") {
        super(message);
        this.statusCode = 403;

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}