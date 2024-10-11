const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
      contact: {
        name: 'Your Name',
      },
      servers: [
        {
          url: 'http://localhost:3001', // Change this to your Render URL when deployed
        },
      ],
    },
  },
  apis: ['./server.js'], // Define where the API routes are documented
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
