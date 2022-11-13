import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Post_log',
      description: '',
    },
    host: 'localhost:8080',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  apis: ['./router/*.js'], //Swagger 파일 연동
};

const specs = swaggereJsdoc(options);
export { swaggerUi, specs };
