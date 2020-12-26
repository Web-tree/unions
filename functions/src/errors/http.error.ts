
export interface HttpError extends Error {
    code: number;
    message: string;
}

export function isHttpError(e: any): e is HttpError {
    return e.code && e.message;
}

export class BadRequestError implements HttpError {
    code = 400;
    name = 'BadRequest'
    message = "Bad request";

    constructor(message?: string) {
        this.message = message!;
    }
}

export class UnauthorizedError implements HttpError {
    code = 401;
    name = 'Unauthorized'
    message = "You don't have permission for it.";

    constructor(message?: string) {
        this.message = message!;
    }
}
export class ServerError implements HttpError {
    code = 500;
    name = 'ServerError'
    message = 'Server error';
}
