export type HttpResponse = {
    statusCode: number;
    body: any;
};

export const success = (data: any): HttpResponse => ({
    statusCode: 200,
    body: {
        data,
        infos: { statusCode: 200, }
    },
});

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: {
        data,
        infos: { statusCode: 201, }
    },
});

export const accepted = (data: any): HttpResponse => ({
    statusCode: 202,
    body: {
        data,
        infos: { statusCode: 202, }
    }
});

export const badRequest = (errorMessage: any): HttpResponse => ({
    statusCode: 400,
    body: {
        errorMessage,
        infos: { statusCode: 400, }
    },
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: 'Unauthorized',
});

export const notFound = (errorMessage: any): HttpResponse => ({
    statusCode: 404,
    body: {
        errorMessage,
        infos: { statusCode: 400, }
    },
});

export const serviceError = (errorMessage: any): HttpResponse => ({
    statusCode: 500,
    body: {
        errorMessage,
        infos: { statusCode: 500, }
    }
});