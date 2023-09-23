export type HttpResponse = {
    statusCode: number;
    body: any;
};

export const success = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data,
});

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data,
});

export const badRequest = (errorMessage: any): HttpResponse => ({
    statusCode: 400,
    body: errorMessage,
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: 'Unauthorized',
});

export const notFound = (errorMessage: any): HttpResponse => ({
    statusCode: 404,
    body: errorMessage,
});

export const serviceError = (errorMessage: any): HttpResponse => ({
    statusCode: 500,
    body: errorMessage
});