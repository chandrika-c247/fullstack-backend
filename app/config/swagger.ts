import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { CONF_ENV } from '@config/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Demo API',
        description: 'This is an api documentation for Demo application.',
        version: '1.0.0',
    },
    servers: [
        {
            description: 'Server',
            url: 'http://localhost:3000/api',
        },
    ],
    tags: [
        {
            name: 'demo',
            description: 'Demo API',
        },
        {
            name: 'todo',
            description: 'Todo API',
        },
    ],
    components: {
        schemas: {
            Demo: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: '589a815f53f1eae555f01425',
                    },
                    firstname: {
                        type: 'string',
                        example: 'first',
                    },
                    lastname: {
                        type: 'string',
                        example: 'last',
                    },
                    username: {
                        type: 'string',
                        example: 'AbcXyz',
                    },
                    role: {
                        type: 'string',
                        example: 'admin',
                    },
                    email: {
                        type: 'string',
                        example: 'test@gmail.com',
                    },
                    createdAt: {
                        type: 'string',
                        example: '2022-08-03T06:24:34.739Z',
                    },
                    updatedAt: {
                        type: 'string',
                        example: '2022-08-03T06:24:34.739Z',
                    },
                },
            },
            DemoCreate: {
                type: 'object',
                properties: {
                    firstname: {
                        type: 'string',
                        example: 'first',
                    },
                    lastname: {
                        type: 'string',
                        example: 'last',
                    },
                    username: {
                        type: 'string',
                        example: 'AbcXyz',
                    },
                    role: {
                        type: 'string',
                        example: 'admin',
                    },
                    email: {
                        type: 'string',
                        example: 'test@gmail.com',
                    },
                },
            },
            Todo: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: '589a815f53f1eae555f01425',
                    },
                    task: {
                        type: 'string',
                        example: 'Create API',
                    },
                    status: {
                        type: 'string',
                        example: 'Pending',
                    },
                    createdAt: {
                        type: 'string',
                        example: '2022-08-03T06:24:34.739Z',
                    },
                    updatedAt: {
                        type: 'string',
                        example: '2022-08-03T06:24:34.739Z',
                    },
                },
            },
            TodoCreate: {
                type: 'object',
                properties: {
                    task: {
                        type: 'string',
                        example: 'Create API',
                    },
                    status: {
                        type: 'string',
                        example: 'Pending',
                    },
                },
            },
            Country: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'Andorra',
                    },
                    native: {
                        type: 'string',
                        example: 'Andorra',
                    },
                    code: {
                        type: 'string',
                        example: 'AD',
                    },
                },
            },
            State: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'Alabama',
                    },
                    countryCode: {
                        type: 'string',
                        example: 'US',
                    },
                    fipsCode: {
                        type: 'string',
                        example: '01',
                    },
                    iso: {
                        type: 'string',
                        example: 'AL',
                    },
                    latitude: {
                        type: 'string',
                        example: '32.31823140',
                    },
                    longitude: {
                        type: 'string',
                        example: '-86.90229800',
                    },
                },
            },
            City: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'Adams',
                    },
                    latitude: {
                        type: 'string',
                        example: '43.80923000',
                    },
                    longitude: {
                        type: 'string',
                        example: '-76.02409000',
                    },
                },
            },
            '500': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Server Not Responding.',
                    },
                },
            },
            '404': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Record not found.',
                    },
                },
            },
            '401': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'User Unauthenticated.',
                    },
                },
            },
            '400': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Bad Request response.',
                    },
                },
            },
        },
        securitySchemes: {
            jwt_api_auth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
};

const swaggeroptions: ILooseObject = {
    swaggerDefinition,
    apis: ['./app/routes/*.ts'],
};
const openapiSpecification = swaggerJsdoc(swaggeroptions);

const apiDoc = (app: ILooseObject) => {
    if (CONF_ENV !== 'production') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
    }
};

export default apiDoc;
